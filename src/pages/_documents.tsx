import { ColorModeScript } from '@chakra-ui/react'
import type { DocumentContext } from 'next/document'
import NextDocument, { Head, Html, Main, NextScript, } from 'next/document'

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }


  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Roboto+Slab:wght@400;500;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <ColorModeScript initialColorMode="system" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
