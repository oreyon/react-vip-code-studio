# 14-belajar-membuat-aplikasi-web-dengan-react

- Initiate new project vite react typescript
npm create vite@latest app-name -- --template react-ts
npm install react-router-dom
npm install @fortawesome/fontawesome-free

- Install Tailwind CSS
npm install --save-dev tailwindcss postcss autoprefixer
npx tailwindcss init -p
===
tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

===

Add the Tailwind directives to your CSS
Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.

index.css

@tailwind base;
@tailwind components;
@tailwind utilities;

===
