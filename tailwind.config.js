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
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
    },
    inset: {
      '1/4': '25%',
      '1/2': '50%'
    },
    extend: {
      colors: {
        'light-text': '#444444',
        'blue' : "#1F45A8",
        'dark-blue': "#192552",
        'paragraph':"#617193" ,
        'light-text': '#444444', 
        'betterfit-light-blue': '#E1EBF6',
        'betterfit-soft-blue': '#F7FAFD',
        'betterfit-pale-blue': '#EFF5FA',
        'betterfit-basic-blue': '#1F45A8',
        'betterfit-dark-blue': '#1B3B91',
        'betterfit-darker-blue': '#18398D',
        'betterfit-grey-blue': '#617193',
        'betterfit-highlight-blue': '#9EB9FF',
        'betterfit-navy': '#2A3863',
        'betterfit-grey': '#C7D4E5',
        'betterfit-graphite': '#192552',
        'betterfit-highlight-red':'#B74554',
        'betterfit-highlight-darkred':'#7A1A37',
        'status-grey': 'E1EBF6',
        'status-dark-grey': '#43537B',
        'status-red': '#FFDDCF',
        'status-dark-red': '#932B42',
        'status-green': '#B3F2A7',
        'status-dark-green':'#217C3A',
        'status-yellow': '#FBF2AD',
        'status-dark-yellow': '#8D7825',
        'status-blue': '#BECBFF',
        'status-dark-blue': '#1D2A93',
      },
      padding: {
        '7': '1.75rem',
      },
      fontSize: {
        'xxs':'0.60rem',
        '3xl': '1.75rem',
      },
      letterSpacing: {
        'extra-wide': '2px',
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