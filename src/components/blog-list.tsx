import { Divider, Grid, GridItem } from '@chakra-ui/react'

import CardBlog from '@/components/card-blog'
import { Blog } from '@/generated/types'

interface BlogListProps {
  blogs: Blog[]
}

const BlogList = ({ blogs }: BlogListProps) => {
  return (
    <Grid
      templateRows='repeat(1 , minmax(1fr))'
      templateColumns='repeat(6,  1fr)'
      gap={4}
    >
      {blogs.map((blog, i) => (
        <GridItem
          colSpan={{
            base: 6,
            md: i >= 1 ? 2 : 6,
          }}
          key={i}
        >
          <CardBlog
            isFull={i < 1 ? true : false}
            blog={blog}
            author={blog.author}
          />
          {i < 1 ? <Divider /> : ''}
        </GridItem>
      ))}
    </Grid>
  )
}

export default BlogList
