/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'blinker': ['Blinker', 'sans-serif'],
        'nunito': ['Nunito', 'sans-serif'],
        'sora': ['Sora', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#404040',   // Açık gri
          DEFAULT: '#333333', // Ana gri ton
          dark: '#262626',    // Koyu gri
        },
        surface: {
          light: '#2a2a2a',   // Yüzey rengi açık
          DEFAULT: '#242424', // Yüzey rengi
          dark: '#1a1a1a',    // Yüzey rengi koyu
        },
        border: '#404040',    // Border rengi
      }
    },
  },
  plugins: [],
}

