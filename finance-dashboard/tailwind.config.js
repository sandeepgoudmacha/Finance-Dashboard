/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#8b5cf6',
        danger: '#ef4444',
        success: '#22c55e',
        warning: '#f59e0b',
      }
    },
  },
  plugins: [],
}
