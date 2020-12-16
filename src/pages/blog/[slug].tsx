import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import format from 'date-fns/format'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import {
  Image as DatoImage,
  renderMetaTags,
  useQuerySubscription,
} from 'react-datocms'
import Markdown from 'react-markdown'

import { metaTagsFragment, responsiveImageFragment } from '@/generated/fragment'
import { contentful, request } from '@/lib/datocms'
import { postRenderer } from '@/lib/renderers'
import CardAvatar from '@/components/card-avatar'

const BlogDetail = ({ subscription }) => {
  const {
    data: { site, blog },
  } = useQuerySubscription(subscription)

  const metaTags = blog.seo.concat(site.favicon)
  return (
    <>
      <Head>{renderMetaTags(metaTags)}</Head>
      {blog && (
        <Stack
          maxW='6xl'
          mx='auto'
          borderRadius='md'
          bgColor='navy.800'
          spacing={16}
          px={{ base: 5, md: 40 }}
          py={8}
        >
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
            <Markdown renderers={postRenderer} source={blog.content} />
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
    query: `
      query BlogBySlug($slug: String) {
        site: _site {
          favicon: faviconMetaTags {
            ${metaTagsFragment}
          }
        }
        blog(filter: {slug: {eq: $slug}}) {
          coverImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000}) {
              ${responsiveImageFragment}
            }
          }
          seo: _seoMetaTags {
            ${metaTagsFragment}
          }
          title
          slug
          subtitle
          tags
          author {
            id
            name
            avatar {
              url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100})
            }
          }
          date
          ogImage: coverImage {
            url(imgixParams: {fm: jpg, fit:crop, w: 2000, h:1000})
          }
          content
        }
      }
    `,
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
  const data = await contentful().request(`
    {
      blogs: allBlogs(orderBy: createdAt_DESC) {
        slug
      }
    }
  `)

  return {
    paths: data.blogs.map((blog) => `/blog/${blog.slug}`) || [],
    fallback: false,
  }
}

export default BlogDetail
