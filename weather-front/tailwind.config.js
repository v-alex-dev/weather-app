import { url } from 'inspector';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./**/*.ts"],
  theme: {
    extend: {
      fontFamily:'Lilita One, sans-serif',

      backgroundImage:{
        "weather-bg": "url('../public/weather.jpeg')",
      }
    },
  },
  plugins: [], 
}

