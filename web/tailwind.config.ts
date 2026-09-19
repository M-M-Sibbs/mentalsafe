import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand green carried over from the original Bolt site (#16a34a),
        // extended into a full ramp so components can use consistent steps.
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        // Warm sand used for large calm surfaces — avoids the clinical
        // all-white look while keeping AA contrast with slate text.
        sand: {
          50: '#fdfcfa',
          100: '#f7f4ee',
          200: '#ece6da',
          300: '#ddd3c1',
        },
        // Crisis/urgent actions. Deliberately distinct from the brand green
        // so a help button is never confused with a normal action.
        urgent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.25rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 220ms ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
