import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { join } from 'path';
import { TaxonomyRow, ClassificationResult, MatchType } from './types.js';

const rootPath = process.cwd();

const taxonomy: TaxonomyRow[] = JSON.parse(
  readFileSync(join(rootPath, 'data', 'epfo-statuses.json'), 'utf-8')
);
const systemPrompt: string = readFileSync(
  join(rootPath, 'classifier-system-prompt.md'),
  'utf-8'
);

function buildTaxonomyContext(taxonomyData: TaxonomyRow[]) {
  return taxonomyData
    .map(
      (row) =>
        `reason_code: ${row.reason_code}\nfamily: ${row.family}\ncanonical_status: "${row.canonical_status}"\naliases: ${JSON.stringify(row.aliases)}`
    )
    .join('\n\n');
}

const taxonomyContext = buildTaxonomyContext(taxonomy);

export async function classifyStatus(statusText: string): Promise<ClassificationResult> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
  });

  const MODEL = "gpt-4o-mini";
  
  let matched_id: string | null = null;
  let match_type: MatchType = 'unrecognized';
  let family = 'UNRECOGNIZED';

  const hasValidKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'dummy-key';

  if (hasValidKey) {
    try {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        temperature: 0,
        max_tokens: 120,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `## Known EPFO Status Taxonomy\n\n${taxonomyContext}\n\n## Status Text to Classify\n\n"${statusText.trim()}"` },
        ],
      }, { timeout: 8000 });

      const raw = completion.choices[0]?.message?.content ?? '';
      const classification = JSON.parse(raw);
      
      if (
        typeof classification.family === 'string' &&
        typeof classification.reason_code === 'string' &&
        ['clear', 'partial', 'unrecognized'].includes(classification.match_type)
      ) {
        matched_id = classification.reason_code;
        match_type = classification.match_type as MatchType;
        family = classification.family;
      } else {
        console.warn('[classifyStatus] Invalid classification response format:', classification);
      }
    } catch (err: any) {
      console.error('[classifyStatus] OpenAI classification failed. Error:', err.message);
      console.error('[classifyStatus] Stack Trace:', err.stack);
      console.error('[classifyStatus] Input text was:', statusText.trim());
      console.error('[classifyStatus] Falling back to deterministic router.');
    }
  }

  // Deterministic Fallback
  if (!matched_id) {
    const normalized = statusText.toLowerCase();
    const found = taxonomy.find(row => 
      row.canonical_status.toLowerCase().includes(normalized) ||
      row.aliases?.some(alias => normalized.includes(alias.toLowerCase()))
    );

    if (found) {
      matched_id = found.reason_code;
      match_type = 'clear';
      family = found.family;
    }
  }

  let matched_row: TaxonomyRow | null = null;
  if (match_type !== 'unrecognized' && matched_id) {
    matched_row = taxonomy.find((row) => row.reason_code === matched_id) ?? null;
    if (!matched_row) {
      console.warn(`[classifyStatus] Model returned unknown reason_code: ${matched_id}`);
      match_type = 'unrecognized';
      family = 'UNRECOGNIZED';
      matched_id = 'UNRECOGNIZED';
    }
  }

  if (!matched_row) {
    matched_row = taxonomy.find((row) => row.reason_code === 'UNRECOGNIZED') ?? null;
  }

  return {
    match_type,
    raw_classification: { family, reason_code: matched_id || 'UNRECOGNIZED', match_type },
    matched_row,
  };
}
