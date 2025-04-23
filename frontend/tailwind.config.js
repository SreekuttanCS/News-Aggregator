/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      container: {
        center: true, // Center the container by default
        padding: {
          DEFAULT: '1rem', // Padding on all sides by default
          sm: '2rem', // Add custom padding for the small screen
          lg: '4rem', // Add custom padding for large screens
        },
    },
  },
  plugins: [],
}
