// PipelineTracker.jsx — Static linear stepper.
// Stages: Submitted → Employer Review → EPFO Review → Decision → Payment → Completed
// Active step uses #003366 with pulse-ring animation. Completed steps use slate-600.

const STAGES = [
  { id: 'Submitted',      label: 'Submitted' },
  { id: 'Employer Review', label: 'Employer' },
  { id: 'EPFO Review',    label: 'EPFO Review' },
  { id: 'Decision',       label: 'Decision' },
  { id: 'Payment',        label: 'Payment' },
  { id: 'Completed',      label: 'Completed' },
];

const DECISION_BADGE: Record<string, { className: string; label: string }> = {
  Approved: {
    className: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    label: 'Approved',
  },
  Rejected: {
    className: 'bg-brick-50 border-brick-200 text-brick-700',
    label: 'Rejected',
  },
  'Returned for Correction': {
    className: 'bg-amber-50 border-amber-200 text-amber-700',
    label: 'Returned',
  },
};

function stepStatus(stage: { id: string }, activeStage: string | null) {
  if (!activeStage) return 'pending';
  const activeIdx = STAGES.findIndex((s) => s.id === activeStage);
  const stageIdx  = STAGES.findIndex((s) => s.id === stage.id);
  if (stageIdx < activeIdx)  return 'completed';
  if (stageIdx === activeIdx) return 'active';
  return 'pending';
}

interface PipelineTrackerProps {
  stage: string | null;
  decision: string | null;
}

export default function PipelineTracker({ stage, decision }: PipelineTrackerProps) {
  return (
    <div className="pt-4 pb-2">
      <p className="text-sm font-mono uppercase tracking-widest text-slate-500 mb-3">
        Claim Pipeline
      </p>

      {/* Step track */}
      <div className="flex items-start justify-between gap-1">
        {STAGES.map((s, idx) => {
          const status   = stepStatus(s, stage);
          const isLast   = idx === STAGES.length - 1;
          const isDecision = s.id === 'Decision';

          // Connector is filled if next step is at least active or this step is completed
          const connectorFilled =
            !isLast &&
            (status === 'completed' ||
              stepStatus(STAGES[idx + 1], stage) !== 'pending');

          return (
            <div key={s.id} className="flex items-start flex-1">
              {/* Step + label */}
              <div className="flex flex-col items-center">

                {/* Circle */}
                <div
                  className={[
                    'w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-semibold transition-all duration-200',
                    status === 'completed'
                      ? 'bg-slate-600 border-slate-600 text-white'
                      : status === 'active'
                      ? 'step-active'   // defined in index.css — uses #003366 + pulse-ring
                      : 'bg-white border-slate-200 text-slate-300',
                  ].join(' ')}
                  aria-label={`${s.label}: ${status}`}
                >
                  {status === 'completed' ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : status === 'active' ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-white block" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-200 block" />
                  )}
                </div>

                {/* Label */}
                <span
                  className={[
                    'mt-1.5 text-center leading-tight',
                    status === 'active'
                      ? 'text-xs font-semibold text-slate-900'
                      : status === 'completed'
                      ? 'text-xs font-medium text-slate-600'
                      : 'text-xs text-slate-500',
                  ].join(' ')}
                  style={{ fontSize: '10px', maxWidth: '56px' }}
                >
                  {s.label}
                </span>

                {/* Decision outcome badge — inline under Decision step */}
                {isDecision && decision && DECISION_BADGE[decision] && (
                  <span
                    className={[
                      'mt-1.5 text-center font-mono border rounded px-1.5 py-0.5 leading-tight',
                      DECISION_BADGE[decision].className,
                    ].join(' ')}
                    style={{ fontSize: '9px', maxWidth: '72px', whiteSpace: 'nowrap' }}
                  >
                    {DECISION_BADGE[decision].label}
                  </span>
                )}
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className="flex-1 h-px mt-3.5 mx-1 transition-colors duration-300"
                  style={{ backgroundColor: connectorFilled ? '#003366' : '#E2E8F0' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
