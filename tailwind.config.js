/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          bright: '#ffd060',
          mid: '#c8941a',
          deep: '#8a5f0a',
        },
        void: {
          DEFAULT: '#03030a',
          1: '#07071a',
          2: '#0d0d22',
          3: '#14142e',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        ui: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
