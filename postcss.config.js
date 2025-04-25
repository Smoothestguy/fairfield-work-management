// This file ensures proper Tailwind CSS configuration
// It uses the require syntax which is more reliable than the object syntax

const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
}
