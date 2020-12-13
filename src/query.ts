import { ResponsiveImageType, ToMetaTagsType } from 'react-datocms'

import { META_TAGS_FRAGMENT, RESPONSIVE_IMAGE_FRAGMENT } from '@/lib/fragment'

export const querySlugProject = `
  query AppQuery {
    projects: allProjects(orderBy: createdAt_DESC) {
      slug
    }
  }
`

export const query = `
  query AppQuery($first: IntType) {
    page: project {
      seo: _seoMetaTags {
        ${META_TAGS_FRAGMENT}
      }
    }

    site: _site {
      favicon: faviconMetaTags {
        ${META_TAGS_FRAGMENT}
      }
    }

    allProjects: allProjects(first: $first, orderBy: createdAt_ASC) {
      coverImage {
        url
        responsiveImage {
          ${RESPONSIVE_IMAGE_FRAGMENT}
        }
      }
      title
      slug
      url
      techStack
    }
  }
`

export const queryProject = `
  query MyQuery {
  project: project(filter: {slug: {eq: $slug}}) {
      id
      title
      slug
      excerpt
      demo
      sourceCode
      content
      tech_stack
      coverImage: {
        responsiveImage(imgixParams: { fit:crop, ar: "16:9", w:750, auto:format }) {
          ${RESPONSIVE_IMAGE_FRAGMENT}
        }
      }
    }
  }
`

export type TechStacks = {
  id: string
  name: string
}

export type Projects = {
  id: string
  title: string
  slug: string
  url: string
  techStack: string
  coverImage: {
    url: string
    responsiveImage: ResponsiveImageType
  }
}

export type QueryResponseType = {
  page: {
    seo: ToMetaTagsType
  }
  site: {
    favicon: ToMetaTagsType
  }
  allProjects: Projects[]
}

export type QueryVariables = {
  first?: number
  slug?: string | string[]
}
