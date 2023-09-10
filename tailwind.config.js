/** @type {import('tailwindcss').Config} */


module.exports = {
  content: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  theme: {
    extend: {
      backgroundColor: {
        'dark-primary': '#1E2A38',
        'dark-secondary': '#2A3A4D',
        'light-background': '#FFFFFF'
      },
      textColor: {
        'dark-foreground': '#E8E8E8',
        'dark-accent': '#FF6B6B',
        'dark-secondary-accent': '#4ECDC4',
        'light-foreground': '#333',
        'light-accent': '#FF6B6B',
        'light-secondary-accent': '#4ECDC4'
      }
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      secondary: ['Raleway', 'sans-serif'],
    },
  },
  variants: {},
  plugins: [],
};

