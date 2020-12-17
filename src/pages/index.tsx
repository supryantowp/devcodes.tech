import { Box, Heading } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import React from 'react'

const metaTags = {
  title: 'Devcodes Smkn 1 Ciamis',
  titleTemplate: '%s',
  description: 'rekayasa perangkat lunak rpl smkn 1 ciamis (SERVER)',
}

const Home = () => {
  return (
    <>
      <NextSeo {...metaTags} />
      <Box display='grid' placeItems='center' minH='50vh' px={5} maxW='2xl'>
        <Box>
          <Heading fontFamily='body' color='navy.300'>
            Rekayasa Perangkat Lunak (RPL) Smkn 1 Ciamis
          </Heading>
          <Heading mt={4} as='h5' fontSize='lg'>
            GENERASI KE-5 SOFTWARE ENGINNERING
          </Heading>
        </Box>
      </Box>
    </>
  )
}

export default Home
