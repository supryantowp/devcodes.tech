import { Stack, Skeleton } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useQuerySubscription } from 'react-datocms'

import { QueryAllBlog } from '@/generated/query'
import { QueryResponseType, QueryVariables } from '@/generated/types'
import BlogList from '@/components/blog-list'
import TitleSeperator from '@/components/title-seperator'

const meta = {
  title: 'Blog tulisan',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, amet.',
}

const Blog = () => {
  const { data } = useQuerySubscription<QueryResponseType, QueryVariables>({
    query: QueryAllBlog,
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
  })

  return (
    <>
      <Stack borderRadius='md' bgColor='navy.800' spacing={4} p={8}>
        <NextSeo {...meta} />
        <TitleSeperator {...meta} />
        {!data && <Skeleton h={{ base: '3xs', sm: '2xs', lg: 'xs' }} />}
        {data && <BlogList blogs={data?.allBlogs} />}
      </Stack>
    </>
  )
}

export default Blog
