const plugins = require('tailwind-react-ui/plugins')
module.exports = {
  theme: {
    extend: {
      padding: {
        '7': '1.75rem',
      },
      fontSize: {
        '2-5xl': '1.65rem',
      },
      inset: {
        '-sm': '-30px',
      },
    },
  },
  purge: [
  ],
  plugins: [
    require('tailwindcss/lib/plugins/container')({}),
    ...Object.keys(plugins).map(name => plugins[name]()),
  ],
  theme: {
    fontFamily: {
      'body': ['Open Sans'],
    },
    extend: {
      colors: {
        'light-text': '#444444',
        'blue' : "#1F45A8",
        'dark-blue': "#192552",
        'paragraph':"#617193" 
      }
    }
  }
}