const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  important: true,
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    colors: {
      primary: '#3498db',
      'primary-darker': '#217dbb',
      'primary-transparent': '#3498db40',
      background: '#eee',
      'background-darker': '#ddd',
      success: '#1bb460',
      warning: '#cb9324',
      'warning-hover': '#ad7e1f',
      danger: '#cb282a',
      'danger-hover': '#aa2224',
      transparent: 'transparent',
      'semi-transparent': '#ffffffc0',
      white: '#fff',
      black: '#000',
      gray: '#777777',
      'dark-gray': '#555555',
      border: '#ccc',
      disabled: '#00000080'
    },
    backgroundOpacity: {
      25: '0.25',
      50: '0.5',
      75: '0.75',
      100: '1'
    },
    fill: {
      primary: '#3498db'
    },
    backgroundColor: (theme) => theme('colors'),
    textColor: (theme) => theme('colors'),
    borderColor: (theme) => theme('colors'),
    inset: {
      0: 0,
      auto: 'auto',
      16: '4rem',
      64: '16rem'
    },
    extend: {
      boxShadow: {
        border: '0 0 0 1px rgba(16, 22, 26, 0.15), 0 0 0 rgba(16, 22, 26, 0), 0 0 0 rgba(16, 22, 26, 0)'
      }
    }
  },
  variants: {
    borderColor: ['hover', 'disabled'],
    backgroundColor: ['hover', 'disabled'],
    opacity: ['hover', 'disabled'],
    gridAutoFlow: ['responsive', 'hover', 'focus'],
    boxShadow: ['responsive', 'hover']
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`
          rule.walkDecls((decl) => {
            decl.important = true
          })
        })
      })
    })
  ],
  future: {
    removeDeprecatedGapUtilities: true
  }
}
