import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useQuerySubscription } from 'react-datocms'

import CardProject from '@/components/card-project'
import { QueryAllProject } from '@/generated/query'
import { QueryResponseType, QueryVariables } from '@/generated/types'

const Project = () => {
  const { error, data } = useQuerySubscription<
    QueryResponseType,
    QueryVariables
  >({
    query: QueryAllProject,
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
  })

  return (
    <>
      <NextSeo
        title='Project'
        description='Kumpulan hasil karya murid-murid kelas RPL (SERVER)'
      />

      {error && (
        <div>
          <h1>{error.code}</h1>
          {error.message}
          {error.response && (
            <pre>{JSON.stringify(error.response, null, 2)}</pre>
          )}
        </div>
      )}

      <Stack
        maxW='6xl'
        mx='auto'
        borderRadius='md'
        bgColor='navy.800'
        spacing={6}
        p={8}
      >
        <Stack>
          <Heading>Semua Project</Heading>
          <Text>Kumpulan hasil karya murid-murid kelas RPL (SERVER)</Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          {data &&
            data.allProjects.map((projects) => (
              <CardProject
                key={projects.id}
                image={projects.coverImage.responsiveImage}
                title={projects.title}
                url={projects.url}
                techStack={projects.techStack}
              />
            ))}
        </SimpleGrid>
      </Stack>
    </>
  )
}

export default Project
