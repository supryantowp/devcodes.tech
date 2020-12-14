import { ResponsiveImageType } from 'react-datocms'

export type QueryResponseType = {
  allProjects: Project[]
  allBlogs: Blog[]
}

export type QueryVariables = {
  first?: number
  slug?: string | string[]
}

export type Project = {
  coverImage: {
    responsiveImage: ResponsiveImageType
  }
  id: string
  title: string
  url: string
  techStack: string
}

export type Blog = {
  id: string
  title: string
  slug: string
  subtitle: string
  tags: string
  author: Author
  date: Date
  content: string
  coverImage: {
    responsiveImage: ResponsiveImageType
  }
}

export type Author = {
  name: string
  avatar: {
    url: string
    responsiveImage: ResponsiveImageType
  }
}
