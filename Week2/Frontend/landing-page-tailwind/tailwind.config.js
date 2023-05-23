/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '200px',
      md: '800px',
      lg: '900px',
      xl: '1280px',
    },
    colors: {
      'backgroundColorWhite': '#fffdfa',
      'gunMentalColor': '#5e607a',
      'darkSpaceBlueColor': '#00001a',
      'lightVermillionColor': '#f15d51',
      'yellowColor': '#e9aa52',
      'silverColor': '#c5c6ce'
    },
    fontFamily: {
      sans: ['Inter', 'system-ui'],
    },
  },
  plugins: [],
}

