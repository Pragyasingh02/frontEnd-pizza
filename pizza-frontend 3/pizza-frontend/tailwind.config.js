/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-blue': '0 4px 6px rgba(251, 192, 147, 0.5)', // Example with blue shadow
        'custom-red': '0 4px 6px rgba(255, 0, 0, 0.3)', // Example with red shadow
    },
    },
  },
  plugins: [],
}

