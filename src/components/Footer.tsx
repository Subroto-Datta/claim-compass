// Footer.jsx — Full disclaimer as specified. Thin #003366 top-accent for visual closure.

export default function Footer() {
  return (
    <footer className="mt-8 pt-px">
      {/* Thin EPFO navy stripe — visual closure, mirrors the result card accent */}
      <div className="h-px w-full" style={{ backgroundColor: '#003366', opacity: 0.15 }} />
      <div className="border-t border-slate-200 py-8">
        <div className="max-w-3xl mx-auto px-5">
          <div className="flex flex-col sm:flex-row sm:gap-12 gap-4">
            {/* Left col — what this is */}
            <div className="space-y-2 sm:flex-1">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider font-mono">
                About Claim Compass
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                An independent educational prototype built for a hackathon. Not affiliated with
                EPFO or the Government of India.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                The knowledge base is manually researched from publicly available EPFO documentation
                and citizen-reported patterns. No live connection to EPFO systems or member accounts.
              </p>
            </div>

            {/* Right col — where to go */}
            <div className="space-y-2 sm:w-48 flex-shrink-0">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider font-mono">
                Official Resources
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                For official information visit:
              </p>
              <p className="text-sm font-mono text-slate-600 leading-relaxed">
                unifiedportal-mem.epfindia.gov.in
              </p>
              <p className="text-xs text-slate-500">
                Helpline:{' '}
                <span className="font-mono text-slate-600">1800-118-005</span>
                <br />
                Mon–Sat, 9 AM–6 PM
              </p>
            </div>
          </div>

          {/* Bottom strip */}
          <p className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 text-center">
            Information may not reflect the most recent EPFO procedural updates.
            Always verify with official sources before acting.
          </p>
        </div>
      </div>
    </footer>
  );
}
