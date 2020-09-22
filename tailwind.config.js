const plugins = require('tailwind-react-ui/plugins')
module.exports = {
  // ...project config
  purge: [
  ],
  plugins: [
    require('tailwindcss/lib/plugins/container')({}),
    ...Object.keys(plugins).map(name => plugins[name]()),
  ],
}