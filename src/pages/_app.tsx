import '@/styles/app.css'

import { Box, ChakraProvider, Stack } from '@chakra-ui/react'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from 'next/head'
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo'

import Footer from '@/components/footer'
import MobileDrawer from '@/components/mobile-drawer'
import Navbar from '@/components/navbar'
import theme from '@/lib/theme'
import siteConfig from '~/site-config'

export default function MyApp(props: AppProps) {
  const { Component, pageProps, router } = props

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
        openGraph={{
          title: siteConfig.title,
          description: siteConfig.description,
          type: 'website',
          site_name: siteConfig.title,
          images: [
            {
              url: `${siteConfig.url}/images/logo.jpeg`,
              width: 1024,
              height: 512,
              alt: siteConfig.title,
            },
          ],
        }}
        twitter={{
          handle: '@devcodes',
          site: '@devcodes',
          cardType: 'summary_large_image',
        }}
      />

      <SocialProfileJsonLd
        type='Organization'
        name={siteConfig.title}
        url={siteConfig.url}
        sameAs={[
          'https://www.instagram.com/official_server/',
          'https://www.github.com/devcode',
        ]}
      />

      <ChakraProvider theme={theme}>
        <Stack justify='space-between' minH='100vh' spacing={0}>
          <Navbar />
          <Box as='main' alignItems='start'>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </Stack>

        <MobileDrawer />
      </ChakraProvider>
    </>
  )
}
