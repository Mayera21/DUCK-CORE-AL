/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5', // purple-blue
        secondary: '#10b981', // green
        accent: '#facc15', // yellow
      },
      boxShadow: {
        glow: '0 0 15px rgba(79,70,229,0.6), 0 0 30px rgba(79,70,229,0.4)',
      },
      animation: {
        pulseGlow: 'pulse 1.5s infinite',
      }
    },
  },
  plugins: [],
}