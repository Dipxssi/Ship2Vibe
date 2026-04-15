/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: "#070A12",
        panel: "#0C1120",
        border: "#1B2340",
        accent: "#57A3FF",
        accent2: "#8A5CFF",
        accent3: "#2EE6D6",
      },
      boxShadow: {
        glow: "0 0 40px rgba(87, 163, 255, 0.25)",
        soft: "0 12px 40px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};
