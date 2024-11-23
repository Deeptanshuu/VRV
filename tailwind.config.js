/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vrv': {
          50: '#e9efee',
          100: '#c8d5d3',
          200: '#a4bab7',
          300: '#809e9a',
          400: '#5c837e',
          500: '#304945',
          600: '#243634',
          700: '#182423',
          800: '#0c1211',
          900: '#000000',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
} 