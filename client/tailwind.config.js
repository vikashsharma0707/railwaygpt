/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff', 100: '#d9eaff', 200: '#bcd9ff',
          500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 900: '#0b1f4a',
        },
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      boxShadow: { glow: '0 10px 30px -10px rgba(59,130,246,0.5)' },
    },
  },
  plugins: [],
};
