const plugins = require('tailwind-react-ui/plugins')
module.exports = {
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
        'basic-blue': '#1F45A8',
        'darker-blue': '#224192',
        'hot-pink': '#F9525B',
      },
      padding: {
        '7': '1.75rem',
      },
      fontSize: {
        '2-5xl': '1.65rem',
      },
      inset: {
        '-sm': '-30px',
      },
      margin: {
        'tiny': '0.05rem',
      }
    }
  }
}