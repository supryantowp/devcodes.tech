import {
  ResponsiveImageType,
  ToMetaTagsType,
  SeoMetaTagType,
} from 'react-datocms'

export type QueryResponseType = {
  allProjects: Project[]
  allBlogs: Blog[]
  authors: Author[]
  author: Author
  site: Site
  blog: Blog
}

export type Site = {
  favicon: SeoMetaTagType
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
  seo: ToMetaTagsType
}

export type Author = {
  id: string
  name: string
  bio: string
  username: string
  website: string
  github: string
  avatar: {
    url: string
    responsiveImage: ResponsiveImageType
  }
  seo: ToMetaTagsType
}
