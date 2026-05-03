/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f5f4f0',
          100: '#e8e6de',
          200: '#d4d0c4',
          300: '#b8b3a0',
          400: '#9a9380',
          500: '#7d7664',
          600: '#645f50',
          700: '#4e4a3f',
          800: '#3a3730',
          900: '#252320',
          950: '#141310',
        },
        ember: {
          50: '#fff8f0',
          100: '#ffefd6',
          200: '#ffdba8',
          300: '#ffc070',
          400: '#ff9d38',
          500: '#ff7d10',
          600: '#e86200',
          700: '#c04d00',
          800: '#983d07',
          900: '#7c340c',
          950: '#431703',
        },
        sage: {
          50: '#f1f7f1',
          100: '#deedde',
          200: '#bedcbf',
          300: '#92c294',
          400: '#64a368',
          500: '#448748',
          600: '#346c38',
          700: '#2b572f',
          800: '#244628',
          900: '#1e3a22',
          950: '#0f2013',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

