/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Verdana', 'Arial', 'sans-serif'],
        mono: ['"Courier New"', 'Courier', 'monospace'],
      },
      colors: {
        // Civic Utility palette — state-only usage, no decoration
        civic: {
          bg: '#F8FAFC',
          card: '#FFFFFF',
          text: '#0F172A',
          muted: '#64748B',
          border: '#E2E8F0',
          'border-strong': '#CBD5E1',
        },
        // EPFO authority anchor — the single government trust signal
        epfo: {
          DEFAULT: '#003366',
          hover:   '#004080',
          light:   '#E8F0F8',
          ring:    '#99BBDD',
        },
        // State colors
        amber: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
        },
        emerald: {
          50:  '#ECFDF5',
          100: '#D1FAE5',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
        },
        brick: {
          50:  '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
        },
        navy: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          600: '#1D4ED8',
          700: '#1E40AF',
          800: '#1E3A8A',
        },
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-ring': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0,51,102,0.25)' },
          '50%':       { boxShadow: '0 0 0 5px rgba(0,51,102,0)' },
        },
      },
      animation: {
        'fade-up':    'fade-up 0.35s ease-out both',
        'fade-in':    'fade-in 0.25s ease-out both',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
