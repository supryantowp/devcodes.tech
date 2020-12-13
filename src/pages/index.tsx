import { Box, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import NextImage from 'next/image'
import { NextSeo } from 'next-seo'
import React from 'react'

const Home = () => {
  return (
    <>
      <NextSeo title='Devcodes' titleTemplate='%s' />
      <Stack
        px={{ base: 5, md: 40 }}
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: 8, md: 12 }}
        align={{ base: 'center', md: 'start' }}
      >
        <Box
          display='grid'
          placeItems='center'
          borderRadius='full'
          bg='navy.300'
          h='190px'
          w='190px'
          minW='190px'
        >
          <NextImage
            src='/images/logo.jpeg'
            width='180px'
            height='180px'
            layout='fixed'
            className='hero-image'
            alt='hero image'
          />
        </Box>
        <VStack
          align={{ base: 'center', md: 'start' }}
          textAlign={{ base: 'center', md: 'start' }}
        >
          <Heading color='navy.300' fontSize='lg'>
            Rekayasa Perangkat Lunak
          </Heading>
          <Heading>Devcodes</Heading>
          <Text color='gray.500'>
            Satu bidang profesi yang mendalami cara-cara pengembangan perangkat
            lunak termasuk pembuatan, pemeliharaan, manajemen organisasi
            pengembangan perangkat lunak dan manajemen kualitas.
          </Text>
        </VStack>
      </Stack>
    </>
  )
}

export default Home
