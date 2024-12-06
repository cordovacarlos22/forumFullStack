/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-glass': '0 4px 30px rgba(0, 0, 0, 0.1)', // Box shadow
      },
      backdropBlur: {
        'custom': '18.8px', // Backdrop blur
      },
      colors: {
        'glass-bg': 'rgba(255, 255, 255, 0.28)', // Semi-transparent background
        'glass-border': 'rgba(255, 255, 255, 0.7)', // Border color
      },
      borderRadius: {
        'glass': '16px', // Border radius
      },
    },
  },
  plugins: [],
}