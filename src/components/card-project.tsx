import { Heading, Image, Stack, Text } from '@chakra-ui/react'
import { Image as DatoImage, ResponsiveImageType } from 'react-datocms'

import { TechStacks } from '@/query'
import styles from '@/styles/card-project.module.css'

interface CardProjectProps {
  image: string
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
    >
      <Heading fontSize='2xl' variant='link'>
        {props.title}
      </Heading>
      <Text color='gray.500'>{props.techStack}</Text>
      <Image
        alt={props.title}
        _groupHover={{ transform: 'translateY(-12px)' }}
        transition='transform 150ms ease'
        src={props.image}
      />
    </Stack>
  )
}

export default CardProject
