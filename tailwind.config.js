const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: {
          bright: "#AE00FB",
          moderate: "#B980F0",
          mid: "#D62AD0",
          light: "#F0D9FF",
        },
      },
      fontFamily: {
        merri: ["Merriweather Sans", "sans-serif"],
        fred: ["Fredoka One", "sans-serif"],
      },
      backgroundImage: {
        splatter: "url('/src/img/splatter.png')",
        brushed: "url('/src/img/brushed.jpg')",
        brushed2: "url('/src/img/brushed2.jfif')",
      },
      borderColor: (theme) => ({
        DEFAULT: theme("colors.gray.300", "currentColor"),
        neon: "#ccff00",
      }),
      backgroundColor: (theme) => ({
        neon: "#ccff00",
      }),
      boxShadow: {
        sam: "0 7px 14px 0 rgba(74, 217, 127, 0.2)",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
