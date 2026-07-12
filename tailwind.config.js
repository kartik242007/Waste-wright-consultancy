/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1440px' }
    },
    extend: {
      colors: {
        // ============================================================
        // Circulon — Premium Emerald palette (re-tuned)
        // ------------------------------------------------------------
        // Old graphite tokens are re-mapped to emerald equivalents so
        // every existing class (bg-pine, text-signal, etc.) migrates
        // automatically without touching component code.
        // ============================================================

        // Base + elevated surfaces
        pine:     '#0A1F16',   // --bg-base (was #12161A)
        pine2:    '#05170F',   // deepest — used for text on shine-green
        graphite: '#122A1E',   // --bg-elevated (cards, panels)
        bone:     '#F4F1E9',   // unchanged

        // Greens
        signal:   '#4AE8A0',   // --shine-green (was #4CC38A)
        'deep-green': '#1F5C42', // secondary UI, inactive borders
        emerald2: '#0F3A26',   // mid-dark for surfaces / mesh material

        // Gold
        brass:    '#C9A227',   // --gold (unchanged)

        // Hairline / semantic aliases
        hairline: 'rgba(244,241,233,0.10)',
        border:   'rgba(244,241,233,0.10)',
        input:    'rgba(244,241,233,0.10)',
        ring:     '#4AE8A0',
        background: '#0A1F16',
        foreground: '#F4F1E9',
        primary:   { DEFAULT: '#4AE8A0', foreground: '#05170F' },
        secondary: { DEFAULT: '#122A1E', foreground: '#F4F1E9' },
        muted:     { DEFAULT: '#122A1E', foreground: 'rgba(244,241,233,0.62)' },
        accent:    { DEFAULT: '#C9A227', foreground: '#05170F' },
        card:      { DEFAULT: '#0A1F16', foreground: '#F4F1E9' },
        popover:   { DEFAULT: '#0A1F16', foreground: '#F4F1E9' },
        destructive:{ DEFAULT: '#B23A48', foreground: '#F4F1E9' },
      },
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 8vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-xl':  ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'display-lg':  ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      borderRadius: { lg: '10px', md: '8px', sm: '6px' },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up':   { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'draw':           { '0%': { strokeDashoffset: '400' }, '100%': { strokeDashoffset: '0' } },
        'shimmer':        { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        'ticker':         { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'sheen':          { '0%': { transform: 'translateX(-120%) skewX(-18deg)' }, '100%': { transform: 'translateX(220%) skewX(-18deg)' } },
        'core-pulse':     { '0%,100%': { opacity: '0.85' }, '50%': { opacity: '1' } },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'draw':           'draw 1.4s cubic-bezier(.7,0,.3,1) forwards',
        'shimmer':        'shimmer 2.4s linear infinite',
        'ticker':         'ticker 40s linear infinite',
        'sheen':          'sheen 0.9s cubic-bezier(.2,.8,.2,1)',
        'core-pulse':     'core-pulse 2.8s ease-in-out infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
