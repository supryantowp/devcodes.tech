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

    allProjects: allProjects(first: $first, orderBy: createdAt_DESC) {
      id
      title
      slug
      excerpt
      demo
      sourceCode
      coverImage {
        responsiveImage(imgixParams: { fit: crop, ar: "16:9", w:750, auto: format }) {
          ${RESPONSIVE_IMAGE_FRAGMENT}
        }
      }
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
      techStacks: {
        id
        source
        name
        icon: {
          responsiveImage(imgixParams: { fit:crop, ar: "2:2", w:30, auto:format }) {
            ${RESPONSIVE_IMAGE_FRAGMENT}
          }
        }
      }
      coverImage: {
        responsiveImage(imgixParams: { fit:crop, ar: "16:9", w:750, auto:format }) {
          ${RESPONSIVE_IMAGE_FRAGMENT}
        }
      }
    }
  }
`

export type Projects = {
  id: string
  title: string
  slug: string
  excerpt: string
  demo: string
  sourceCode: string
  techStacks: {
    id: string
    source: string
    name: string
    icon: {
      responsiveImage: ResponsiveImageType
    }
  }
  coverImage: {
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
