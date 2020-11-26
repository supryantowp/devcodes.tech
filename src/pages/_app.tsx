import '@/styles/app.css'

import { Box, ChakraProvider, Stack } from '@chakra-ui/react'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import theme from '@/theme'
import siteConfig from '~/site-config'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MyApp({ Component, pageProps, router }: any) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>

      <DefaultSeo
        title={siteConfig.title}
        titleTemplate={`%s · ${siteConfig.title}`}
        description={siteConfig.description}
        canonical={siteConfig.url + (router.asPath || '')}
      />

      <ChakraProvider resetCSS theme={theme}>
        <Stack justify='space-between' minH='100vh' spacing={0}>
          <Navbar />
          <Box as='main' alignItems='start'>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Stack>
      </ChakraProvider>
    </>
  )
}
