import { Stack } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'

const Home = () => {
  return (
    <>
      <Stack alignItems='center'>
        <NextSeo title='Home' titleTemplate='%s' />
        <h1>Hi</h1>
      </Stack>
    </>
  )
}

export default Home
