/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient": "linear-gradient(to right, #3b82f6, #9333ea)",
        "custom-gradient-2": "linear-gradient(to left, #3b82f6, #f43f5e)",
        "card-gradient": "linear-gradient(to right, #38b2ac, #4299e1)",
      },
      colors: {
        navbarColor: "#ffffff",
        btnColor: "#3364F7",
        linkColor: "#2a5bd7",
        testColor: "#ff0000", // Add test color to check
      },
    },
  },
  plugins: [],
};
