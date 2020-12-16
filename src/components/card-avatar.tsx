import { Avatar, Box, Divider, HStack, Text, Tooltip } from '@chakra-ui/react'
import format from 'date-fns/format'

import { Author } from '@/generated/types'

interface CardAvatarProps {
  author: Author
  date: Date
}

const CardAvatar = (props: CardAvatarProps) => {
  const {
    author: { name, avatar },
    date,
  } = props
  return (
    <HStack spacing={3}>
      <Avatar src={avatar.url} name={name} size='sm' />
      <Box>
        <Text fontSize='md' fontWeight='bold'>
          {name}
        </Text>
        <Text fontSize='sm' fontWeight='light'>
          {format(new Date(date), 'do MMM Y')}
        </Text>
      </Box>
    </HStack>
  )
}

export default CardAvatar
