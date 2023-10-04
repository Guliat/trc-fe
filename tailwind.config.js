/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.vue"],
  theme: {
    fontFamily: {
      shantell: ['Shantell Sans Variable'],
    },
    extend: {
      colors: {
        green: {
          20: '#2FA65B',
          30: '#178E3B'
        }
      }
    },
  },
  plugins: [],
}