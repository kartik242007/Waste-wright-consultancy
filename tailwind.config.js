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
        // Circulon brand tokens
        pine: '#12161A',
        pine2: '#0C1013',
        bone: '#F4F1E9',
        signal: '#4CC38A',
        brass: '#C9A227',
        graphite: '#1B2126',
        hairline: 'rgba(244,241,233,0.12)',
        // shadcn semantic aliases mapped to brand
        border: 'rgba(244,241,233,0.12)',
        input: 'rgba(244,241,233,0.12)',
        ring: '#4CC38A',
        background: '#12161A',
        foreground: '#F4F1E9',
        primary: { DEFAULT: '#4CC38A', foreground: '#0C1013' },
        secondary: { DEFAULT: '#1B2126', foreground: '#F4F1E9' },
        muted: { DEFAULT: '#1B2126', foreground: 'rgba(244,241,233,0.62)' },
        accent: { DEFAULT: '#C9A227', foreground: '#0C1013' },
        card: { DEFAULT: '#12161A', foreground: '#F4F1E9' },
        popover: { DEFAULT: '#12161A', foreground: '#F4F1E9' },
        destructive: { DEFAULT: '#B23A48', foreground: '#F4F1E9' },
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'draw':           'draw 1.4s cubic-bezier(.7,0,.3,1) forwards',
        'shimmer':        'shimmer 2.4s linear infinite',
        'ticker':         'ticker 40s linear infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}
