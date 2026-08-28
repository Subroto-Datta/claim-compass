// App.jsx — Root component. Manages state; renders all layout sections in order.

import { useState } from 'react';
import TopNav from './components/TopNav';
import HeadingBlock from './components/HeadingBlock';
import InputArea from './components/InputArea';
import ResultCard from './components/ResultCard';
import Footer from './components/Footer';

export default function App() {
  const [statusText, setStatusText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    const text = statusText.trim();
    if (!text || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statusText: text }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || `Server error ${response.status}`);
      }

      const data = await response.json();
      setResult(data);

      // Scroll result into view smoothly
      setTimeout(() => {
        document.getElementById('result-section')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 80);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-5">
          <HeadingBlock />

          {/* Divider */}
          <div className="border-t border-slate-200/60 mb-4" />

          {/* Input area */}
          <section aria-label="Status input">
            <InputArea
              value={statusText}
              onChange={setStatusText}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </section>

          {/* Error state */}
          {error && (
            <div
              role="alert"
              className="mt-4 rounded-md border border-brick-200 bg-brick-50 px-4 py-3 flex items-start gap-2"
            >
              <svg
                width="16" height="16" viewBox="0 0 16 16" fill="none"
                className="text-brick-600 mt-0.5 flex-shrink-0" aria-hidden="true"
              >
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8" cy="10.5" r="0.75" fill="currentColor" />
              </svg>
              <p className="text-sm text-brick-700">{error}</p>
            </div>
          )}

          {/* Result section */}
          {result && (
            <section
              id="result-section"
              aria-label="Interpretation result"
              className="mt-5 mb-4"
            >
              <div className="flex items-center gap-3 mb-4">
                <p className="text-sm font-mono uppercase tracking-widest text-slate-500">
                  Interpretation
                </p>
                <div className="flex-1 border-t border-slate-100" />
              </div>
              <ResultCard result={result} />
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
