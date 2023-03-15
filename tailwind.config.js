/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '100%': {
            transform: 'scale(100%)',
            color: 'white'
          },
          '0%': {
            transform: 'scale(200%)',
            color: '#e79c2a'
          },
        }
      },
      animation: {
        appear: 'wiggle 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
}
