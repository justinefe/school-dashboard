module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#888",
      secondary: "#6771dc",
      tertiary: "#a367dc",
      backcolor: "#eef3f8",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#888",
      secondary: "rgba(1, 0, 29, 0.6)",
      danger: "#888",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
