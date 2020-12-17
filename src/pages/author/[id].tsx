import {
  Box,
  Divider,
  Heading,
  Link,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react'
import NextImage from 'next/image'

import BlogList from '@/components/blog-list'
import CardProject from '@/components/card-project'
import { GetStaticPaths, GetStaticProps } from 'next'
import { contentful, request } from '@/lib/datocms'
import { QueryResponseType, QueryVariables } from '@/generated/types'
import { QueryAuthorById } from '@/generated/query'
import { renderMetaTags, useQuerySubscription } from 'react-datocms'
import Head from 'next/head'

const Author = ({ subscription }) => {
  const {
    data: { site, author, allBlogs },
  } = useQuerySubscription<QueryResponseType, QueryVariables>(subscription)

  const metaTags = author.seo.concat(site.favicon)

  return (
    <>
      <Head>{renderMetaTags(metaTags)}</Head>
      <Stack borderRadius='md' bgColor='navy.800' spacing={8} p={8}>
        <Stack
          align='center'
          direction={{ base: 'column', md: 'row' }}
          spacing={6}
        >
          <Box
            display='grid'
            placeItems='center'
            borderRadius='full'
            bg='navy.700'
            h='110px'
            w='110px'
            minW='110px'
          >
            <NextImage
              src={author.avatar.url}
              width='100px'
              height='100px'
              layout='fixed'
              className='hero-image'
              alt='hero image'
            />
          </Box>
          <Stack spacing={2}>
            <Heading>{author.name}</Heading>
            <Text color='gray.500'>{author.bio}</Text>
            <Stack fontSize='sm' spacing={4} color='gray.500' direction='row'>
              <Text>{allBlogs.length} TULISAN</Text>
              {author.website && (
                <Link isExternal variant='link' href={author.website}>
                  WEBSITE
                </Link>
              )}
              {author.github && (
                <Link isExternal variant='link' href={author.github}>
                  GITHUB
                </Link>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Divider border='1px' />

        {allBlogs && <BlogList blogs={allBlogs} />}
      </Stack>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const graphqlRequest = {
    query: QueryAuthorById,
    variables: {
      id: params.id,
    },
  }

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await contentful().request<QueryResponseType, QueryVariables>(`
    {
      authors: allAuthors(orderBy: createdAt_DESC) {
        id
      }
    }
  `)

  return {
    paths: data.authors.map((author) => `/author/${author.id}`) || [],
    fallback: false,
  }
}

export default Author
