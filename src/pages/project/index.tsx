import {
  Box,
  Button,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { NextSeo } from 'next-seo'
import {
  Image as DatoImage,
  renderMetaTags,
  useQuerySubscription,
} from 'react-datocms'
import { Helmet } from 'react-helmet'
import { FaChrome, FaGithub } from 'react-icons/fa'

import { query, QueryResponseType, QueryVariables } from '@/query'

const Project = () => {
  const { error, data } = useQuerySubscription<
    QueryResponseType,
    QueryVariables
  >({
    query,
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
  })

  const metaTags = data ? data.page.seo.concat(data.site.favicon) : []

  return (
    <>
      <NextSeo title='Project' description='Project kelas' />

      {error && (
        <div>
          <h1>{error.code}</h1>
          {error.message}
          {error.response && (
            <pre>{JSON.stringify(error.response, null, 2)}</pre>
          )}
        </div>
      )}

      <Box textAlign='center' mb={12}>
        <Heading>Semua Project</Heading>
      </Box>

      <SimpleGrid
        px={{ base: 5, md: 20 }}
        columns={{ base: 1, md: 3 }}
        spacing={6}
      >
        {data &&
          data.allProjects.map((projects) => (
            <VStack
              align='start'
              borderRadius='md'
              bg='gray.700'
              spacing={1}
              border='1px'
              borderColor='gray.600'
              key={projects.id}
            >
              <DatoImage
                fadeInDuration={1000}
                style={{
                  borderTopRightRadius: '5px',
                  borderTopLeftRadius: '5px',
                  minHeight: 200,
                  objectFit: 'cover',
                  objectPosition: 'center',
                  background: 'gray',
                }}
                data={projects.coverImage.responsiveImage}
              />
              <Stack p={4}>
                <NextLink href={`/project/${projects.slug}`}>
                  <Heading
                    fontSize='2xl'
                    cursor='pointer'
                    _hover={{ color: 'navy.300' }}
                  >
                    {projects.title}
                  </Heading>
                </NextLink>
                <Text
                  color='gray.400'
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                  dangerouslySetInnerHTML={{ __html: projects.excerpt }}
                />
              </Stack>
              <HStack p={4} spacing={2}>
                {projects.demo && (
                  <Link
                    isExternal
                    href={projects.demo}
                    _hover={{ textTransform: 'none' }}
                  >
                    <Button
                      size='sm'
                      colorScheme='navy'
                      leftIcon={<FaChrome size={20} />}
                    >
                      Demo
                    </Button>
                  </Link>
                )}
                {projects.sourceCode && (
                  <Link isExternal href={projects.sourceCode}>
                    <Button size='sm' leftIcon={<FaGithub size={20} />}>
                      Source Code
                    </Button>
                  </Link>
                )}
              </HStack>
            </VStack>
          ))}
      </SimpleGrid>
    </>
  )
}

export default Project
