import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'navy.900',
        lineHeight: 'base',
        transition: 'background-color 0.2s',
      },
      '*::placeholder': {
        color: 'whiteAlpha.400',
      },
      '*, *::before, &::after': {
        borderColor: 'whiteAlpha.300',
        wordWrap: 'break-word',
      },
    },
  },

  colors: {
    navy: {
      50: '#d6faff',
      100: '#aaf1ff',
      200: '#7aebff',
      300: '#47e8ff',
      400: '#1ae9ff',
      500: '#00c1e6',
      600: '#0089b4',
      700: '#005a81',
      800: '#00314f',
      900: '#000f1e',
    },
  },

  components: {
    Link: {
      variants: {
        link: {
          color: 'navy.300',
        },
      },
    },
    Heading: {
      variants: {
        link: {
          color: 'navy.300',
        },
      },
    },
  },

  fonts: {
    body: 'Merriweather',
    heading: 'Roboto',
  },
})

export default theme
