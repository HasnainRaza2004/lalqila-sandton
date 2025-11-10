/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C0A0A',
          dark: '#5A0808',
          light: '#9B0C0C',
        },
        cream: '#FFF5E6',
        gold: '#D4AF37',
      },
    },
  },
  plugins: [],
}