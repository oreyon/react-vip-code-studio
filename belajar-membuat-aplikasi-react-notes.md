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

Atomic design hierarcy

sub atomic -> atoms -> molecules - organism -> templates - pages

sub atomic

- typhography
- color pallete
- spacing
- shadows

atoms (Elements, digabung dengan molecules)

- input labels
- input
- submit button

molecules

- email input

organism (Elements)

- email input, password input, login button

templates (Layouts)

- form login or logout with the same input behaviour (register, login, logout similiar but slighly diff input)

pages

- form login complete with sub menu

===

write props for children

type AuthLayoutsProps = {  
 titleprops: string;
 children?: React.ReactNode;
}

====

Trivia:
useState = a condition in component. a variable. component wil re-render when variable is changed.

useEffect = a way to listen condition. run when deppendencies is change.

useReft = keep a value that dont need for rendering. antonym of useEffect

JSON Parse = convert string to become json object

JSON Stringfy = convert JSON object to become text string

====

Fetch data with Fake API: <https://fakestoreapi.com/docs>

- install library to fetch http
npm install --save axios

====
