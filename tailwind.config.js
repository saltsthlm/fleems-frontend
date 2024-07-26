import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        button: "#E7E8EC",
        background: "#F5F5F5",
        secondary: "#FFFFFF",
        tertiary: "#D9D9D9",
        danger: "#FF0808",
        font: "#000000",
      },
      gridTemplateColumns: {
        center3: "1fr auto 1fr",
      },
    },
  },
  plugins: [daisyui],
};
