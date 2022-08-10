module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
        duration: 300,
      },
    },
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
  },
  plugins: [],
};
