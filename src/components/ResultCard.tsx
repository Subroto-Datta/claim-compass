// ResultCard.jsx — The main result display.
// Owner badge, plain meaning, next step / avoid this panels, pipeline tracker.
// All copy comes from matched_row (the knowledge base) — never from the model.
// EPFO owner badge uses the official #003366 navy. Card has a top accent stripe + fade-up entry.

import PipelineTracker from './PipelineTracker';
import { ClassificationResult } from '../lib/types';

const OWNER_STYLES: Record<string, any> = {
  EPFO:     {
    bg: '#003366', border: '#003366', text: '#FFFFFF',
    bgLight: '#E8F0F8', borderLight: '#99BBDD', textLight: '#003366',
    label: 'EPFO',
  },
  You:      {
    bg: '#B45309', border: '#B45309', text: '#FFFFFF',
    bgLight: '#FFFBEB', borderLight: '#FDE68A', textLight: '#B45309',
    label: 'YOU',
  },
  Employer: {
    bg: '#B45309', border: '#B45309', text: '#FFFFFF',
    bgLight: '#FFFBEB', borderLight: '#FDE68A', textLight: '#B45309',
    label: 'EMPLOYER',
  },
  Bank:     {
    bg: '#B91C1C', border: '#B91C1C', text: '#FFFFFF',
    bgLight: '#FEF2F2', borderLight: '#FECACA', textLight: '#B91C1C',
    label: 'BANK',
  },
  Unknown:  {
    bg: '#64748B', border: '#64748B', text: '#FFFFFF',
    bgLight: '#F8FAFC', borderLight: '#E2E8F0', textLight: '#475569',
    label: 'UNKNOWN',
  },
};

// Accent stripe color per owner — the #003366 stripe on EPFO cards is the key trust signal
const ACCENT_COLOR: Record<string, string> = {
  EPFO:     '#003366',
  You:      '#B45309',
  Employer: '#B45309',
  Bank:     '#B91C1C',
  Unknown:  '#94A3B8',
};

function OwnerBadge({ responsible_party }: { responsible_party: string }) {
  const style = OWNER_STYLES[responsible_party] || OWNER_STYLES.Unknown;
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md"
      style={{
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`,
      }}
    >
      <span
        className="text-sm font-mono font-semibold tracking-widest uppercase"
        style={{ color: style.text }}
      >
        OWNER: {style.label}
      </span>
    </div>
  );
}

function UnrecognizedCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm result-enter">
      {/* Top accent — neutral slate for unrecognized */}
      <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl bg-slate-300" />

      <div className="flex items-start gap-3">
        <svg
          width="18" height="18" viewBox="0 0 18 18" fill="none"
          className="text-amber-600 mt-0.5 flex-shrink-0" aria-hidden="true"
        >
          <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 5.5v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="12.5" r="0.75" fill="currentColor" />
        </svg>
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Status not matched</h2>
          <p className="mt-1 text-sm text-slate-600">
            We couldn't reliably match this against the public EPFO status taxonomy. Here is general
            guidance for manual review.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4 space-y-3">
        <p className="text-sm font-mono uppercase tracking-wider text-slate-500">What to do</p>
        <ol className="text-sm text-slate-700 space-y-2 list-decimal list-inside">
          <li>
            Call the EPFO toll-free helpline:{' '}
            <span className="font-mono font-medium">1800-118-005</span>{' '}
            (Mon–Sat, 9 AM–6 PM)
          </li>
          <li>
            Raise a grievance on{' '}
            <span className="font-mono font-medium">epfigms.gov.in</span>{' '}
            with your UAN, claim ID, and a screenshot of the status.
          </li>
          <li>
            Visit your jurisdictional EPFO office with your UAN passbook printout, claim reference,
            and identity proof.
          </li>
        </ol>
        <p className="text-xs text-slate-500 mt-2">
          Do not re-submit a claim solely because you do not understand the current status — get
          clarification first to avoid creating duplicate claims.
        </p>
      </div>
    </div>
  );
}

export default function ResultCard({ result }: { result: ClassificationResult }) {
  const { match_type, matched_row } = result;

  if (match_type === 'unrecognized' || !matched_row) {
    return <UnrecognizedCard />;
  }

  const {
    reason_code,
    canonical_status,
    family,
    responsible_party,
    meaning,
    action_required,
    dont_do_this,
    wait_guidance,
    stage,
    decision,
  } = matched_row;

  const accentColor = ACCENT_COLOR[responsible_party] || ACCENT_COLOR.Unknown;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm result-enter relative">

      {/* Top accent stripe — the #003366 stripe on EPFO cards is the key trust signal */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />

      {/* Card header — owner badge + status label */}
      <div className="px-5 pt-4 pb-3 border-b border-slate-100">
        <div className="flex flex-wrap items-start gap-3">
          <OwnerBadge responsible_party={responsible_party} />
          {match_type === 'partial' && (
            <span className="text-sm font-mono px-2 py-1 rounded-md border border-amber-200 bg-amber-50 text-amber-700">
              Partial match — review carefully
            </span>
          )}
        </div>
        <p className="mt-2 text-sm font-mono text-slate-500 uppercase tracking-wider">
          {family} · {reason_code}
        </p>
        <p className="mt-1 text-sm font-medium text-slate-700 italic">
          "{canonical_status}"
        </p>
      </div>

      {/* Pipeline Tracker */}
      <div className="px-5 pb-5 border-b border-slate-100">
        <PipelineTracker stage={stage} decision={decision} />
      </div>

      {/* Plain Meaning */}
      <div className="px-5 py-3 border-b border-slate-100">
        <p className="text-sm font-mono uppercase tracking-wider text-slate-500 mb-2">
          Plain Meaning
        </p>
        <p className="text-sm text-slate-800 leading-relaxed">{meaning}</p>
      </div>

      {/* Next Step / Avoid This — equal height side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-slate-100 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {/* Next Step */}
        <div className="px-5 py-3 bg-emerald-50">
          <p className="text-sm font-mono uppercase tracking-wider text-emerald-700 mb-2">
            ↗ Next Step
          </p>
          <p className="text-sm text-slate-800 leading-relaxed">{action_required}</p>
        </div>

        {/* Avoid This */}
        <div className="px-5 py-3 bg-amber-50">
          <p className="text-sm font-mono uppercase tracking-wider text-amber-700 mb-2">
            ⚠ Avoid This
          </p>
          <p className="text-sm text-slate-800 leading-relaxed">{dont_do_this}</p>
        </div>
      </div>

      {/* Wait Guidance */}
      <div className="px-5 pt-3 pb-5">
        <p className="text-sm font-mono uppercase tracking-wider text-slate-500 mb-2">
          Wait Guidance
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">{wait_guidance}</p>
      </div>

    </div>
  );
}
