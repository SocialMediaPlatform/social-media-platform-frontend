/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js, jsx, ts, tsx}",
  ],
  theme: {
    extend: {
        borderRadius: {
          '10px': '10px'
        },
        colors: {
          backgroundGrey: '#121212',
          hoverBackgroundGrey: '#161616',
          borderBoxGrey: '#252526',
          lightRed: '#ec4c23',
          hoverRed: '#ec6e50',
          borderGrey: '#5c5c5c',
          textGrey: '#7b7b7b',
      },
    },
  },
  plugins: [],
}

