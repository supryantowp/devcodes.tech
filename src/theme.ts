import { extendTheme, } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const sans = [
  "Poppins",
  "-apple-system",
  "Roboto",
  "sans-serif",
].join(",")

const mono = [
  "'Roboto Slab'",
  "Consolas",
  "Courier",
  "monospace"
].join(",")

export default extendTheme({
  components: {
    Link: {
      variants: {
        link: props => ({
          color: mode("blue.700", "blue.300")(props)
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
