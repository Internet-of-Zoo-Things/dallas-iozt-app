const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  important: true,
  theme: {
    screens: {
      phone: '450px',
      tablet: '768x',
      laptop: '1024px',
      desktop: '1280px'
    },
    colors: {
      primary: '#3498db',
      'primary-darker': '#217dbb',
      background: '#eee',
      'background-darker': '#ddd',
      success: '#1bb460',
      warning: '#cb9324',
      'warning-hover': '#ad7e1f',
      danger: '#cb282a',
      'danger-hover': '#aa2224',
      transparent: 'transparent',
      white: '#fff',
      black: '#000',
      gray: '#777777',
      'dark-gray': '#333333',
      border: '#ccc'
    },
    backgroundOpacity: {
      25: '0.25',
      50: '0.5',
      75: '0.75',
      100: '1'
    },
    fill: (theme) => theme('colors'),
    backgroundColor: (theme) => theme('colors'),
    textColor: (theme) => theme('colors'),
    borderColor: (theme) => theme('colors')
  },
  variants: {
    borderColor: ['hover', 'disabled'],
    backgroundColor: ['hover', 'disabled'],
    opacity: ['hover', 'disabled'],
    gridAutoFlow: ['responsive', 'hover', 'focus']
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
  ]
}
