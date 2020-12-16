import { responsiveImageFragment } from '@/generated/fragment'

export const QueryAllProject = `
  query AppQuery($first: IntType) {
    allProjects: allProjects(first: $first, orderBy: createdAt_ASC) {
      coverImage {
        responsiveImage {
          ${responsiveImageFragment}
        }
      }
      title
      url
      techStack
    }
  }
`

export const QueryAllBlog = `
  query AppQuery($first: IntType) {
    allBlogs: allBlogs(first: $first, orderBy: createdAt_DESC) {
      id
      title
      subtitle
      tags
      slug
      date
      coverImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000}) {
          ${responsiveImageFragment}
        }
      }
      author {
        name
        avatar {
          url
        }
      }
    }
  }
`
