import { Box, Heading, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

const Tentang = () => {
  return (
    <>
      <NextSeo title='Tentang' />
      <Box display='grid' placeItems='center' minH='50vh' px={5} maxW='2xl'>
        <Box>
          <Heading fontFamily='body' color='navy.300'>
            Kita adalah <Text as='del'>teman</Text> keluarga
          </Heading>
          <Heading mt={4} as='h5' fontSize='lg'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
            error deserunt tempora officiis totam non fuga perspiciatis aut qui
            voluptates!
          </Heading>
        </Box>
      </Box>
    </>
  )
}

export default Tentang
