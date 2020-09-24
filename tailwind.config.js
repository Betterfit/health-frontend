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
    },
  },
  purge: [
  ],
  plugins: [
    require('tailwindcss/lib/plugins/container')({}),
    ...Object.keys(plugins).map(name => plugins[name]()),
  ],
}