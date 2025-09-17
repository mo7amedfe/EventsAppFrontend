/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // ضروري يضم كل ملفات الـ templates والـ TS
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: { extend: {} },
  plugins: [
       require('flowbite/plugin')
  ],
};
