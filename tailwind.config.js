/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      'bright-turquoise': {  
        DEFAULT: '#08D9D6',
        '50': '#9DFBFA',
        '100': '#8AFBF9',  
        '200': '#62F9F7',  
        '300': '#3BF8F5',  
        '400': '#13F6F3',  
        '500': '#08D9D6',  
        '600': '#06A3A1',  
        '700': '#046D6B',  
        '800': '#023736',  
        '900': '#000101'
      },
      'blue-dark': {  
        DEFAULT: '#252A34',  
        '50': '#74829C',  
        '100': '#697793',  
        '200': '#58647C',  
        '300': '#475164',  
        '400': '#363D4C',  
        '500': '#252A34',  
        '600': '#0E1013',  
        '700': '#000000',  
        '800': '#000000',  
        '900': '#000000'
      },
      'radical-red': {  
        DEFAULT: '#FF2E63',  
        '50': '#FFE6EC',  
        '100': '#FFD1DD',  
        '200': '#FFA8BE',  
        '300': '#FF80A0',  
        '400': '#FF5781',  
        '500': '#FF2E63',  
        '600': '#F5003E',  
        '700': '#BD0030',  
        '800': '#850022',  
        '900': '#4D0013'
      },
      'mercury': {  
        DEFAULT: '#EAEAEA',  
        '50': '#FFFFFF',  
        '100': '#FFFFFF',  
        '200': '#FFFFFF',  
        '300': '#FFFFFF',  
        '400': '#FEFEFE',  
        '500': '#EAEAEA',  
        '600': '#CECECE',  
        '700': '#B2B2B2',  
        '800': '#969696',  
        '900': '#7A7A7A'
      },
    },
    extend: {
    },
  },
  plugins: [],
}
