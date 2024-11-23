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
          primary: '#304945',
          secondary: '#3d5b56',
          light: '#405d58',
          dark: '#243634',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 