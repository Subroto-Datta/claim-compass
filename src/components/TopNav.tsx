// TopNav.jsx — Compass wordmark left. High-visibility disclaimer badge right.
// The amber badge is intentional — it's the compliance shield AND a visual differentiator.

export default function TopNav() {
  return (
    <header className="border-b border-slate-200/80 bg-white/90 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
      <div className="max-w-3xl mx-auto px-5 h-14 flex items-center justify-between gap-4">

        {/* Wordmark — compass icon + name */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          {/* Compass SVG — thematically on-brand, zero government emblem */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="9.5" stroke="#003366" strokeWidth="1.5" />
            {/* Compass rose — N needle (navy) + S needle (slate) */}
            <polygon points="11,4 12.4,10.2 11,11.8 9.6,10.2" fill="#003366" />
            <polygon points="11,18 9.6,11.8 11,10.2 12.4,11.8" fill="#94A3B8" />
            {/* Centre dot */}
            <circle cx="11" cy="11" r="1.2" fill="#003366" />
          </svg>
          <span className="text-sm font-semibold tracking-tight" style={{ color: '#003366' }}>
            Claim Compass
          </span>
        </div>

        {/* High-visibility disclaimer — compliance shield, not a footnote */}
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-300 rounded-md px-2.5 py-1 flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="flex-shrink-0">
            <path d="M6 1L11 10H1L6 1Z" stroke="#B45309" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M6 4.5v2.5" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="6" cy="8.5" r="0.6" fill="#B45309" />
          </svg>
          <span className="text-xs font-semibold text-amber-800 whitespace-nowrap">
            Independent Prototype · Not an official EPFO portal
          </span>
        </div>

      </div>
    </header>
  );
}
