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
        font: "#000000",
      },
    },
  },
  plugins: [daisyui],
};
