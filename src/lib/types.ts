export interface TaxonomyRow {
  family: string;
  reason_code: string;
  canonical_status: string;
  aliases: string[];
  stage: string | null;
  decision: string | null;
  responsible_party: string;
  meaning: string;
  action_required: string;
  dont_do_this: string;
  typical_next_stage: string;
  wait_guidance: string;
}

export type MatchType = 'clear' | 'partial' | 'unrecognized';

export interface RawClassification {
  family: string;
  reason_code: string;
  match_type: MatchType;
}

export interface ClassificationResult {
  match_type: MatchType;
  raw_classification: RawClassification;
  matched_row: TaxonomyRow | null;
}
