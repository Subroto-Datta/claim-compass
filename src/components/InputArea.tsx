// InputArea.jsx — Textarea, colorful semantic pill chips, submit button.
// Chips are single-row scrollable; each color maps to the outcome type.

const EXAMPLE_CHIPS = [
  {
    id: 'chip-submitted',
    label: 'Claim Submitted',
    text: 'Claim Submitted',
    dot: '#64748B',
    bg: '#F1F5F9',
    border: '#CBD5E1',
    hoverBg: '#E2E8F0',
    color: '#334155',
  },
  {
    id: 'chip-employer',
    label: 'Pending at Employer',
    text: 'Pending at Employer',
    dot: '#D97706',
    bg: '#FFFBEB',
    border: '#FDE68A',
    hoverBg: '#FEF3C7',
    color: '#92400E',
  },
  {
    id: 'chip-epfo',
    label: 'Under Process',
    text: 'Under Process',
    dot: '#003366',
    bg: '#EEF3F8',
    border: '#99BBDD',
    hoverBg: '#DDEAF5',
    color: '#003366',
  },
  {
    id: 'chip-field-office',
    label: 'Pending / Field Office',
    text: 'Pending for Approval / Field Office',
    dot: '#1D4ED8',
    bg: '#EFF6FF',
    border: '#BFDBFE',
    hoverBg: '#DBEAFE',
    color: '#1E40AF',
  },
  {
    id: 'chip-approved-payment',
    label: 'Approved, Payment Processing',
    text: 'Approved, Payment Under Process',
    dot: '#059669',
    bg: '#ECFDF5',
    border: '#A7F3D0',
    hoverBg: '#D1FAE5',
    color: '#065F46',
  },
  {
    id: 'chip-settled',
    label: 'Settled ✓',
    text: 'Settled',
    dot: '#047857',
    bg: '#ECFDF5',
    border: '#6EE7B7',
    hoverBg: '#A7F3D0',
    color: '#065F46',
  },
  {
    id: 'chip-rejected',
    label: 'Rejected ✕',
    text: 'Rejected',
    dot: '#B91C1C',
    bg: '#FEF2F2',
    border: '#FECACA',
    hoverBg: '#FEE2E2',
    color: '#991B1B',
  },
];

interface InputAreaProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function InputArea({ value, onChange, onSubmit, loading }: InputAreaProps) {
  function handleChipClick(text: string) {
    onChange(text);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Ctrl/Cmd+Enter submits
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && !loading) {
      e.preventDefault();
      onSubmit();
    }
  }

  const canSubmit = value.trim().length > 0 && !loading;

  return (
    <div className="space-y-2">
      {/* Example chips — single scrollable row with right-fade scroll cue */}
      <div className="relative">
        <div
          className="flex items-center gap-2 overflow-x-auto pb-0.5 pr-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <span className="text-xs text-slate-900 flex-shrink-0">Try:</span>
          {EXAMPLE_CHIPS.map((chip) => (
            <button
              key={chip.id}
              id={chip.id}
              type="button"
              onClick={() => handleChipClick(chip.text)}
              className="flex items-center gap-1.5 flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium
                         border transition-all duration-150 active:scale-95"
              style={{
                backgroundColor: chip.bg,
                borderColor: chip.border,
                color: chip.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = chip.hoverBg;
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.10)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = chip.bg;
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.transform = '';
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: chip.dot }}
                aria-hidden="true"
              />
              {chip.label}
            </button>
          ))}
        </div>

        {/* Right-fade gradient — signals more chips to scroll; color matches page bg */}
        <div
          className="absolute top-0 right-0 h-full w-16 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent, #F0F4F8 85%)',
          }}
          aria-hidden="true"
        />
      </div>


      {/* Textarea — focus ring uses EPFO navy */}
      <textarea
        id="status-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g., Claim settled. Payment sent via NEFT on 12-AUG-2024."
        rows={3}
        maxLength={2000}
        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900
                   placeholder:text-slate-500 resize-none font-sans shadow-sm
                   transition-shadow duration-150 focus:outline-none"
        onFocus={(e) => {
          e.target.style.borderColor = '#003366';
          e.target.style.boxShadow = '0 0 0 3px rgba(0,51,102,0.12), 0 1px 3px rgba(0,0,0,0.06)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '';
          e.target.style.boxShadow = '';
        }}
      />

      {/* Character count + submit row */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 font-mono">
          {value.length > 0 ? `${value.length} / 2000` : ''}
        </span>
        <button
          id="submit-btn"
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold
                     disabled:opacity-40 disabled:cursor-not-allowed
                     transition-all duration-150 active:scale-95 shadow-sm"
          style={{
            backgroundColor: canSubmit ? '#003366' : '#94A3B8',
            backgroundImage: canSubmit
              ? 'linear-gradient(135deg, #003366 0%, #004080 100%)'
              : 'none',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
          }}
          onMouseEnter={(e) => {
            if (canSubmit) {
              e.currentTarget.style.backgroundImage = 'linear-gradient(135deg, #004080 0%, #005099 100%)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,51,102,0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (canSubmit) {
              e.currentTarget.style.backgroundImage = 'linear-gradient(135deg, #003366 0%, #004080 100%)';
              e.currentTarget.style.boxShadow = '';
            }
          }}
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true" />
              <span>Classifying status against taxonomy…</span>
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                <polygon points="7,2.5 8,6.5 7,7.5 6,6.5" fill="white" />
                <polygon points="7,11.5 6,7.5 7,6.5 8,7.5" fill="rgba(255,255,255,0.4)" />
              </svg>
              Interpret Status
            </>
          )}
        </button>
      </div>
    </div>
  );
}
