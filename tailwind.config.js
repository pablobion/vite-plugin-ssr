/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/**/*.{js,ts,jsx,tsx}",
    "./server/**/*.{js,ts,jsx,tsx}",
    './components/**/*.{js,jsx}',
    './node_modules/@shadcn/ui/dist/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}