/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      "inp-grey": "#f8f7fc",
      "btn-green": "#21bf73",
      "err-red": "#df4759",
      "border-color": "#dce2ec"
    },
    extend: {
      spacing: {
        '1': '0.5em',
        '2': '0.8em',
      },
      borderRadius: {
        'std': '0.5rem',
      }
    },
  },
  plugins: [],
}
