import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  StackDivider,
  VStack,
} from '@chakra-ui/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import NextLink from 'next/link'
import { NextSeo } from 'next-seo'
import {
  Image as DatoImage,
  renderMetaTags,
  useQuerySubscription,
} from 'react-datocms'
import Helmet from 'react-helmet'
import { FaChrome, FaGithub } from 'react-icons/fa'
import Markdown from 'react-markdown'

import { contentful, request } from '@/lib/datocms'
import { META_TAGS_FRAGMENT, RESPONSIVE_IMAGE_FRAGMENT } from '@/lib/fragment'
import { postRenderer } from '@/lib/renderers'

const Projects = ({ subscription }): JSX.Element => {
  const {
    data: { project, site },
  } = useQuerySubscription(subscription)

  const metaTags = project ? project._seoMetaTags.concat(site.favicon) : []

  return (
    <>
      <Helmet> {renderMetaTags(metaTags)} </Helmet>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        px={{ base: 10, md: 20 }}
        spacing={4}
        alignItems='start'
      >
        <DatoImage
          data={project.coverImage.responsiveImage}
          fadeInDuration={1000}
          style={{
            borderRadius: '5px',
            border: '20px',
            background: 'gray',
          }}
        />

        <Box p={4} borderRadius='md' border='1px' borderColor='gray.600'>
          <Heading as='h5'>Tech Stack</Heading>
          <Divider border='2px' />
          <VStack mt={4} align='start' divider={<StackDivider />}>
            {project.techStacks.map((tech) => (
              <HStack p={4} spacing={4} key={tech.id}>
                <Box bg='gray.600' p={2} borderRadius='md'>
                  <DatoImage data={tech.icon.responsiveImage} />
                </Box>
                <NextLink href='website'>
                  <Link href={tech.source} isExternal fontSize='xl'>
                    {tech.name} <ExternalLinkIcon mx={1} />
                  </Link>
                </NextLink>
              </HStack>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>

      <Box mt={2} px={{ base: 10, md: 20 }} maxW='960px'>
        <Stack
          align='center'
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
        >
          <Heading>{project.title}</Heading>
          <HStack>
            {project.demo && (
              <Link
                href={project.demo}
                isExternal
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
            {project.sourceCode && (
              <Link
                href={project.sourceCode}
                isExternal
                _hover={{ textTransform: 'none' }}
              >
                <Button size='sm' leftIcon={<FaGithub size={20} />}>
                  Source Code
                </Button>
              </Link>
            )}
          </HStack>
        </Stack>
        <Divider mt={2} border='1px' />

        <Box mt={2}>
          <Markdown renderers={postRenderer} source={project.content} />
        </Box>
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const graphqlRequest = {
    query: `
      query ProjectBySlug($slug: String) {

        site: _site {
          favicon: faviconMetaTags {
            ${META_TAGS_FRAGMENT}
          }
        }

        project(filter: {slug: {eq: $slug}} ) {
          id
          title
          slug
          excerpt
          demo
          sourceCode
          content
          _seoMetaTags {
            ${META_TAGS_FRAGMENT}
          }
          techStacks {
            id
            source
            name
            icon {
              responsiveImage(imgixParams: { fit:crop, ar: "2:2", w:30, auto:format }) {
                ${RESPONSIVE_IMAGE_FRAGMENT}
              }
            }
          }
          coverImage {
            responsiveImage(imgixParams: {fit: crop, ar:"16:9", w:750, auto:format}) {
              ${RESPONSIVE_IMAGE_FRAGMENT}
            }
          }
        }
      }
    `,
    preview,
    variables: {
      slug: params.slug,
    },
  }

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await contentful().request(`
    {
      projects: allProjects(orderBy: createdAt_DESC) {
        slug
      }
    }
  `)

  return {
    paths: data.projects.map((project) => `/project/${project.slug}`) || [],
    fallback: false,
  }
}

export default Projects
