/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto": "repeat(auto-fill,minmax(210px,1fr))"
      }
    },



    fontFamily: {
      Rubik: "Rubik Wet Paint"
    }
  },
  plugins: [],
}

