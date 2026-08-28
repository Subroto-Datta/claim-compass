// HeadingBlock.jsx — Page title with EPFO navy left-border accent. Fade-in on mount.

export default function HeadingBlock() {
  return (
    <div className="pt-5 pb-3 animate-fade-in">
      {/* Left-border accent in EPFO navy — authority signal, no logo needed */}
      <div className="flex items-start gap-4">
        <div
          className="w-1 self-stretch rounded-full flex-shrink-0 mt-0.5"
          style={{ backgroundColor: '#003366', minHeight: '2.5rem' }}
          aria-hidden="true"
        />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: '#003366' }}>
            EPFO Claim Status Interpreter
          </h1>
          <p className="mt-2 text-slate-500 text-sm leading-relaxed">
            Paste the exact status text from the Member Portal. We'll tell you what it
            means, who's responsible, and what to do next.
          </p>
          <p className="mt-3 text-sm font-mono text-slate-500 tracking-wide">
            Covers 30+ documented EPFO claim status codes · Knowledge base updated Aug 2024
          </p>
        </div>
      </div>
    </div>
  );
}
