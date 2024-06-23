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
          hoverConvGrey: '#474747',
          hoverBackgroundGrey: '#161616',
          messageGrey: '#3a3a3a',
          borderBoxGrey: '#252526',
          lightRed: '#ec4c23',
          hoverRed: '#ec6e50',
          convModalGrey: '#191919',
          borderGrey: '#5c5c5c',
          textGrey: '#7b7b7b',
          hoverTextGrey: '#9b9b9b',
          avatarGrey: '#979797',
      },
    },
  },
  plugins: [],
}

