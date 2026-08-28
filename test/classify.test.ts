import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { classifyStatus } from '../src/lib/classifier.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  const envFile = readFileSync(join(__dirname, '..', '.env'), 'utf-8');
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && !process.env[key]) {
        process.env[key] = vals.join('=');
      }
    }
  }
} catch {
  // Ignore
}
const testCases = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'test-cases.json'), 'utf-8')
);

describe('classifyStatus', () => {
  for (const tc of testCases) {
    it(`should correctly classify: ${tc.description}`, async () => {
      const result = await classifyStatus(tc.input);
      
      expect(result.match_type).toBe(tc.expected_match_type);
      
      if (tc.expected_reason_code !== 'UNRECOGNIZED') {
        expect(result.raw_classification.reason_code).toBe(tc.expected_reason_code);
      } else {
        expect(result.raw_classification.reason_code).toBe('UNRECOGNIZED');
      }
    });
  }
});
