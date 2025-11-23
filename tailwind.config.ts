import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#c7e0fd',
          300: '#a4cbfc',
          400: '#7eb3f9',
          500: '#5a9bf5',
          600: '#0066ff',
          700: '#0052cc',
          800: '#0042a3',
          900: '#003580',
        },
        accent: {
          50: '#fff7f0',
          100: '#ffede0',
          200: '#ffd4c0',
          300: '#ffb8a0',
          400: '#ff9d80',
          500: '#ff8260',
          600: '#ff6b35',
          700: '#e55a24',
          800: '#cc4a1d',
          900: '#b33a15',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
