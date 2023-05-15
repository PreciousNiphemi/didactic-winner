/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
   
      colors:{
        "primary-weather":"",
        "secondary-weather":"",
      }
    
    },
    fontFamily:{
      Roboto:["Roboto, sans-serif"]
    },
  
    container:{
      padding:"2rem",
      center:true
    },
    screen:{
      sm: "640px",
      md: "768px",

    }
  },
  plugins: [],
}

