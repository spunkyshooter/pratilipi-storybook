module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  theme: {
    fontFamily: {},
    extend: {
      colors: {
        primary: "#A22823",
        secondary: "#221D42",
        grey1: "#8989A2",
        grey2: "#DCDCE4",
      },
      borderRadius: {
        xl: "2rem",
      },
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    opacity: ["responsive", "hover", "focus", "group-hover"], //adding group hover //Note: always put whole array
  },
  plugins: [],
};
