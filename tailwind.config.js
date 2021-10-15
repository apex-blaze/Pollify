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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
