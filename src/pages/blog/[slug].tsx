import { Divider, Heading, Stack, Text } from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import {
  Image as DatoImage,
  renderMetaTags,
  useQuerySubscription,
} from 'react-datocms'
import Markdown from 'react-markdown'

import { contentful, request } from '@/lib/datocms'
import CardAvatar from '@/components/card-avatar'
import { postRenderer } from '@/lib/renderers'
import { QueryResponseType, QueryVariables } from '@/generated/types'
import { QueryBlogBySlug } from '@/generated/query'

const BlogDetail = ({ subscription }) => {
  const {
    data: { site, blog },
  } = useQuerySubscription<QueryResponseType, QueryVariables>(subscription)

  const metaTags = blog.seo.concat(site.favicon)
  return (
    <>
      <Head>{renderMetaTags(metaTags)}</Head>
      {blog && (
        <Stack borderRadius='md' bgColor='navy.800' spacing={8} p={8}>
          <Stack spacing={3}>
            <Stack spacing={2}>
              <Text textTransform='uppercase' color='gray.500' fontSize='sm'>
                {blog.tags}
              </Text>
              <Heading>{blog.title}</Heading>
              <Text>{blog.subtitle}</Text>
              <Divider border='2px' />
            </Stack>
            <CardAvatar author={blog.author} date={blog.date} />
          </Stack>

          <DatoImage
            fadeInDuration={1000}
            data={blog.coverImage.responsiveImage}
          />

          <Stack
            fontSize={{ md: 'lg' }}
            lineHeight='tall'
            spacing={8}
            wordBreak='break-word'
          >
            <Markdown
              renderers={postRenderer}
              source={blog.content}
              escapeHtml={false}
            />
          </Stack>
        </Stack>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const graphqlRequest = {
    query: QueryBlogBySlug,
    variables: {
      slug: params.slug,
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
      allBlogs: allBlogs(orderBy: createdAt_DESC) {
        slug
      }
    }
  `)

  return {
    paths: data.allBlogs.map((blog) => `/blog/${blog.slug}`) || [],
    fallback: false,
  }
}

export default BlogDetail
