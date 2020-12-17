import { Stack, Heading, Text } from '@chakra-ui/react'

interface TitleSeperatorProps {
  title: string
  description: string
}

const TitleSeperator = ({ title, description }: TitleSeperatorProps) => {
  return (
    <Stack>
      <Heading>{title}</Heading>
      <Text>{description}</Text>
    </Stack>
  )
}

export default TitleSeperator
