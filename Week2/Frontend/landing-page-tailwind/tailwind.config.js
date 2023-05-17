/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
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
    fontSize: {
      base: '15px',
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}

