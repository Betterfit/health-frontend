const plugins = require('tailwind-react-ui/plugins')
module.exports = {
  // ...project config
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
      }
    }
  }
}