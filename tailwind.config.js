/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        'drawer-side': '100',
        navbar: '50',
      },
    },
  },
  plugins: [require('daisyui')],
};
