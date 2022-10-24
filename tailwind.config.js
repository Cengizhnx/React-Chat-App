/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: "class",
  theme: {
    screens: {
      'xs': '300px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      'bgDark0': '#26262c',
      'bgDark1': '#191a20',
      'bgDark2': '#323237',
      'bgDarkInput': '#4c4a55',
      "loginInfo": "#a1a1aa",
      "loginTextBg":"#52525b",
      "loginTextBgLight":"#9ca3af",
      "messageHover": "#3f3f46",
      "messageListBorder": "#262626",
      "chatBorder": "#44403c",
      "chatHeader": "#94a3b8",
      "bioBorder": "#404040",
      "phoneNumber": "#a3a3a3",
      "bgLight1": "#fafafa",
      "bgLight2": "#e4e4e7",
      "messageHoverLight": "#dfdfe2",
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
