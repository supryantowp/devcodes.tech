import { Avatar, Box, HStack, Link, Text } from '@chakra-ui/react'
import format from 'date-fns/format'
import NextLink from 'next/link'

import type { Author } from '@/generated/types'

interface CardAvatarProps {
  author: Author
  date: Date
}

const CardAvatar = (props: CardAvatarProps) => {
  const {
    author: { name, avatar, id },
    date,
  } = props
  return (
    <HStack spacing={3}>
      <Avatar src={avatar.url} name={name} size='sm' />
      <Box>
        <NextLink href={`/author/${id}`} passHref>
          <Link href={`author/${id}`}>{name}</Link>
        </NextLink>
        <Text fontSize='sm' fontWeight='light'>
          {format(new Date(date), 'do MMM Y')}
        </Text>
      </Box>
    </HStack>
  )
}

export default CardAvatar
