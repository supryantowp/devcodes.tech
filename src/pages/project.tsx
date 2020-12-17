import { Skeleton, Stack } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { useQuerySubscription } from 'react-datocms'

import ProjectList from '@/components/project-list'
import { QueryAllProject } from '@/generated/query'
import { QueryResponseType, QueryVariables } from '@/generated/types'
import TitleSeperator from '@/components/title-seperator'

const meta = {
  title: 'Semua Project',
  description:
    'kumpulan hasil karya project yang pernah dibuat oleh murid kelas rpl angkatan ke-5',
}

const Project = () => {
  const { data } = useQuerySubscription<QueryResponseType, QueryVariables>({
    query: QueryAllProject,
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
  })

  return (
    <>
      <Stack borderRadius='md' bgColor='navy.800' spacing={6} p={8}>
        <NextSeo {...meta} />
        <TitleSeperator {...meta} />
        {!data && <Skeleton h={{ base: '3xs', sm: '2xs', lg: 'xs' }} />}
        {data && <ProjectList projects={data.allProjects} />}
      </Stack>
    </>
  )
}

export default Project
