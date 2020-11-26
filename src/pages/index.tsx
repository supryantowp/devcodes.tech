import { Stack } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

const Home = () => {
  return (
    <>
      <NextSeo title='Home' titleTemplate='%s' />
      <Stack justify='start'>
        <h1>Hi</h1>
      </Stack>
    </>
  )
}

export default Home
