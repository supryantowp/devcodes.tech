import { Heading, Stack, Text, Wrap } from '@chakra-ui/react'
import { Image as DatoImage, ResponsiveImageType } from 'react-datocms'

interface CardProjectProps {
  image: ResponsiveImageType
  slug: string
  title: string
  url: string
  techStack: string
}

const CardProject = (props: CardProjectProps) => {
  return (
    <Stack
      as='a'
      bgColor='navy.800'
      borderRadius='md'
      _hover={{ bgColor: 'whiteAlpha.100' }}
      href={props.url}
      key={props.slug || props.title}
      maxH={{ base: '3xs', sm: '2xs', lg: 'xs' }}
      overflow='hidden'
      target='_blank'
      rel='noopener noreferrer'
      role='group'
      pt={4}
      px={4}
      textAlign='center'
      transition='background-color 150ms ease'
      spacing={{ base: 4, md: 2 }}
    >
      <Heading fontSize='2xl' variant='link'>
        {props.title}
      </Heading>
      <Text color='gray.500'>{props.techStack}</Text>
      <Wrap
        _groupHover={{ transform: 'translateY(-12px)' }}
        transition='transform 150ms ease'
      >
        <DatoImage fadeInDuration={1000} data={props.image} />
      </Wrap>
    </Stack>
  )
}

export default CardProject
