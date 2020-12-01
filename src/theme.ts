import { extendTheme, } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const sans = [
  "'Major Mono Display'",
  "-apple-system",
  "Roboto",
  "sans-serif",
].join(",")

const mono = [
  "'Montserrat'",
  "Consolas",
  "Courier",
  "monospace"
].join(",")

export default extendTheme({
  colors: {
    purple: {
      50: '#f9e4ff',
      100: '#e5b4fe',
      200: '#d184fa',
      300: '#bf54f7',
      400: '#ac25f4',
      500: '#930fdb',
      600: '#7209ab',
      700: '#52057b',
      800: '#31024b',
      900: '#12001d',
    }
  },
  components: {
    Link: {
      variants: {
        link: props => ({
          color: mode("purple.700", "purple.300")(props)
        })
      }
    }
  },
  fonts: {
    body: sans,
    heading: sans,
    mono
  }
})
