const plugins = require('tailwind-react-ui/plugins')
module.exports = {
  purge: {
    content: ["./src/**/*.tsx"]
  },
  plugins: [
    require('tailwindcss/lib/plugins/container')({}),
    ...Object.keys(plugins).map(name => plugins[name]()),
  ],
  variants: {
    extend: {
      // enables the disabled: variant
      opacity: ({ after }) => after(['disabled']),
    }
  },
  theme: {
    fontFamily: {
      'body': ['Open Sans'],
    },
    screens: {
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
    extend: {
      colors: {
        'light-text': '#444444',
        'blue': "#1F45A8",
        'dark-blue': "#192552",
        'paragraph': "#617193",
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
        'betterfit-green': '#207d4f',
        'betterfit-highlight-red': '#B74554',
        'betterfit-highlight-darkred': '#7A1A37',
        'status-grey': 'E1EBF6',
        'status-dark-grey': '#43537B',
        'status-red': '#F9E9E8',
        'status-dark-red': '#932B42',
        'status-green': '#B3F2A7',
        'status-dark-green': '#217C3A',
        'status-yellow': '#FBF2AD',
        'status-dark-yellow': '#8D7825',
        'status-blue': '#BECBFF',
        'status-dark-blue': '#1D2A93',
        'table-row': '#F7FAFD',
        'resource-teal': '#56BAC8',
        'resource-salmon': '#EA8683',
        'resource-lavender': '#A799F3',
        'resource-green': '#61C091',
        'resource-blue': '#7FAAF4',
        'tag-light-green': '#E3F6ED',
        'tag-light-green-txt': '#235340',
        'tag-light-red': '#F9E9F2',
        'tag-light-red-txt': '#8C254B',
        'tag-light-blue': '#E4EFFC',
        'tag-light-blue-txt': '#234499',
        'tag-light-orange': '#FBEDDE',
        'tag-light-orange-txt': '#803319',
        'tag-light-yellow': '#FEFAE2',
        'tag-light-yellow-txt': '#6B3D1D',
        'tag-light-purple': '#EDEBFC',
        'tag-light-purple-txt': '#234499',
        'faded-blue': 'rgba(42, 57, 99 , 0.4)',
        'title-border': 'rgba(199, 212, 229,0.4)',
        'flow-white': "#FDFFFE",
        'flow-darkblue': "#244684",
        'flow-medblue': "#0A4F92",
        'flow-lightblue': "#2271D8",
        'flow-sky': "#3AF6F8",
        'flow-pale': "#B4EFEF",
        'flow-darkpale': "#61C1BA",
        'flow-bluegrey': '#1F5C66',
        'flow-navy': "#072B35",
        'flow-bfblue': "#0000EE",
        'flow-darkbluegrey': "#0A3A42",
      },
      spacing: {
        '18': '4.5rem',
        '28': '7rem',
        '29': '7.5rem',
        '34': '9rem',
        '35': '9.25rem',
        '36': '9.5rem',
      },
      padding: {
        '7': '1.75rem',
      },
      fontSize: {
        'xxs': '0.60rem',
        '9': '9px',
        '10': '10px',
        '14': '14px',
        '16': '16px',
        '22': '22px',
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
        '.5': '0.10rem'
      },
      inset: {
        '1/4': '25%',
        '1/2': '50%'
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
      },
      opacity: {
        '40': '0.4',
      },
    }
  }
}