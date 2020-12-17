import { SimpleGrid } from '@chakra-ui/react'
import CardProject from '@/components/card-project'
import { Project } from '@/generated/types'

interface ProjectListProps {
  projects: Project[]
}

const ProjectList = ({ projects }: ProjectListProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
      {projects.map((project) => (
        <CardProject
          key={project.id}
          image={project.coverImage.responsiveImage}
          title={project.title}
          url={project.url}
          techStack={project.techStack}
        />
      ))}
    </SimpleGrid>
  )
}

export default ProjectList
