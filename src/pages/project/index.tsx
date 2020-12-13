import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useQuerySubscription } from 'react-datocms'

import CardProject from '@/components/card-project'
import { query, QueryResponseType, QueryVariables } from '@/query'

const Project = () => {
  const { error, data } = useQuerySubscription<
    QueryResponseType,
    QueryVariables
  >({
    query,
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
  })

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

      <Box px={{ base: 5, md: 20 }}>
        <Stack textAlign='center' mb={12}>
          <Heading>Semua Project</Heading>
          <Text>Kumpulan hasil karya murid-murid kelas RPL (SERVER)</Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {data &&
            data.allProjects.map((projects) => (
              <CardProject
                key={projects.id}
                image={projects.coverImage.url}
                slug={projects.slug}
                title={projects.title}
                url={projects.url}
                techStack={projects.techStack}
              />
            ))}
        </SimpleGrid>
      </Box>
    </>
  )
}

export default Project
