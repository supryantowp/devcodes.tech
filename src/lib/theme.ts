import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: 'gray.900',
        color: 'navy.50',
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
      50: '#f6e7ff',
      100: '#dbbbfa',
      200: '#c28ef2',
      300: '#a862eb',
      400: '#9035e3',
      500: '#761cca',
      600: '#5c149e',
      700: '#420d72',
      800: '#270746',
      900: '#10011c',
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
  },

  fonts: {
    body: 'Roboto',
    heading: 'Kanit',
  },
})

export default theme
