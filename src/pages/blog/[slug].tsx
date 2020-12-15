import {
  Avatar,
  HStack,
  Box,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react'
import format from 'date-fns/format'
import Markdown from 'react-markdown'
import { postRenderer } from '@/lib/renderers'
import { GetStaticPaths, GetStaticProps } from 'next'
import { contentful, request } from '@/lib/datocms'
import { metaTagsFragment, responsiveImageFragment } from '@/generated/fragment'
import {
  Image as DatoImage,
  useQuerySubscription,
  renderMetaTags,
} from 'react-datocms'
import Head from 'next/head'

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
            <HStack spacing={3}>
              <Avatar src={blog.author.avatar.url} name='udin' size='sm' />
              <Box>
                <Text fontSize='md' fontWeight='bold'>
                  {blog.author.name}
                </Text>
                <Text fontSize='sm' fontWeight='light'>
                  {format(new Date(blog.date), 'do MMM Y')}
                </Text>
              </Box>
            </HStack>
          </Stack>

          <DatoImage
            fadeInDuration={1000}
            data={blog.coverImage.responsiveImage}
          />

          <Stack lineHeight='tall' spacing={8} wordBreak='break-word'>
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
