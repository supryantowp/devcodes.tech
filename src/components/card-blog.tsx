import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Image, ResponsiveImageType } from 'react-datocms'

import { Author, Blog } from '@/generated/types'

import CardAvatar from './card-avatar'

interface CardBlogProps {
  isFull: boolean
  blog: Blog
  author: Author
}

const CardBlog = (props: CardBlogProps) => {
  const {
    isFull,
    blog: { coverImage, slug, tags, title, subtitle, author, date },
  } = props

  return (
    <SimpleGrid
      p={4}
      columns={{ base: 1, md: isFull ? 2 : 1 }}
      spacing={4}
      _hover={{ background: 'navy.700' }}
      transition='background-color 150ms ease'
      role='group'
      borderRadius='md'
    >
      <Image
        data={coverImage.responsiveImage}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <NextLink href={`/blog/${slug}`} passHref>
        <Stack as='a' href={`/blog/${slug}`} spacing={2} justify='center'>
          <Text textTransform='uppercase' color='gray.500' fontSize='sm'>
            {tags}
          </Text>
          <Heading fontSize='2xl'>{title}</Heading>
          <Text
            color='gray.500'
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {subtitle}
          </Text>
        </Stack>
      </NextLink>
      <CardAvatar author={author} date={date} />
    </SimpleGrid>
  )
}

export default CardBlog
