import { Heading, Image, VStack } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import React from 'react'

const Home = () => {
  return (
    <>
      <NextSeo title='Home' titleTemplate='%s' />
      <VStack justify='center' px={8} py={2} align='center' spacing={4}>
        <Heading>SERVER RPL - 2020</Heading>
      </VStack>
    </>
  )
}

export default Home
