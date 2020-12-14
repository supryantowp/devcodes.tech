import {
  Avatar,
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import format from 'date-fns/format'
import { Image, ResponsiveImageType } from 'react-datocms'
import NextLink from 'next/link'

import { Author } from '@/generated/types'

interface CardBlog {
  isFull?: boolean
  title: string
  slug: string
  subtitle: string
  tags: string
  author: Author
  date: Date
  image: ResponsiveImageType
}

const CardBlog = ({
  isFull,
  title,
  tags,
  slug,
  subtitle,
  author,
  date,
  image,
}: CardBlog) => {
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
        data={image}
        style={{
          maxHeight: 'auto',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
      <NextLink href={`/blog/${slug}`} passHref>
        <Stack as='a' spacing={2} justify='center'>
          <Text textTransform='uppercase' color='navy.300' fontSize='sm'>
            {tags}
          </Text>
          <Heading fontSize='2xl'>{title}</Heading>
          <Text
            color='navy.200'
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {subtitle}
          </Text>
          <HStack spacing={3}>
            <Avatar src='/asldkals' name={author.name} size='sm' />
            <Box>
              <Text fontSize='md' fontWeight='bold'>
                {author.name}
              </Text>
              <Text fontSize='sm' fontWeight='light'>
                {format(new Date(date), 'do MMM Y')}
              </Text>
            </Box>
          </HStack>
        </Stack>
      </NextLink>
    </SimpleGrid>
  )
}

export default CardBlog
