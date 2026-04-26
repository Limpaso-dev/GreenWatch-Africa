/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4fbf5",
          100: "#def3e2",
          500: "#2f8f4e",
          600: "#267543",
          700: "#1d5c36",
          900: "#0f2d1b",
        },
        earth: {
          100: "#f5efe3",
          400: "#c79f5a",
          700: "#7f5a2f",
        },
      },
      boxShadow: {
        soft: "0 16px 40px rgba(20, 54, 33, 0.10)",
      },
    },
  },
  plugins: [],
};
