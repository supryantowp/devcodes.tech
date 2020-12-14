import { Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useQuerySubscription } from 'react-datocms'

import CardBlog from '@/components/card-blog'
import { QueryAllBlog } from '@/generated/query'
import { QueryResponseType, QueryVariables } from '@/generated/types'

const Blog = () => {
  const { data, error } = useQuerySubscription<
    QueryResponseType,
    QueryVariables
  >({
    query: QueryAllBlog,
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
  })

  return (
    <>
      <NextSeo title='Blog' />

      {error && (
        <div>
          <h1>{error.code}</h1>
          {error.message}
          {error.response && (
            <pre>{JSON.stringify(error.response, null, 2)}</pre>
          )}
        </div>
      )}

      <Stack
        maxW='6xl'
        mx='auto'
        borderRadius='md'
        bgColor='navy.800'
        spacing={8}
        p={8}
      >
        <Stack>
          <Heading>Blog Tulisan</Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,
            libero.
          </Text>
        </Stack>

        <Grid
          templateRows='repeat(1 , minmax(1fr))'
          templateColumns='repeat(6,  1fr)'
          gap={4}
        >
          {data &&
            data.allBlogs.map((b, i) => (
              <GridItem colSpan={i >= 1 ? 2 : 6} key={i}>
                <CardBlog
                  isFull={i < 1}
                  slug={b.slug}
                  title={b.title}
                  subtitle={b.subtitle}
                  tags={b.tags}
                  author={b.author}
                  date={b.date}
                  image={b.coverImage.responsiveImage}
                />
              </GridItem>
            ))}
        </Grid>
      </Stack>
    </>
  )
}

export default Blog
