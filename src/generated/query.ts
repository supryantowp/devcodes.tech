import { metaTagsFragment, responsiveImageFragment } from '@/generated/fragment'

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
        id
        name
        username
        avatar {
          url
        }
      }
    }
  }
`

export const QueryAuthorById = `
  query AuthorById($id: ItemId) {
    site: _site {
      favicon: faviconMetaTags {
        ${metaTagsFragment}
      }
    }
    author(filter: {id: {eq: $id}}) {
      id
      name
      id
      bio
      website
      github
      avatar {
        url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100})
      }
      seo: _seoMetaTags {
        ${metaTagsFragment}
      }
      ogImage: avatar {
        url(imgixParams: {fm: jpg, fit:crop, w: 2000, h:1000})
      }
    }
    allBlogs: allBlogs(filter: {author: {eq: $id}}) {
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
        id
        name
        username
        avatar {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100})
        }
      }
    }
  }
`

export const QueryBlogBySlug = `
  query BlogBySlug($slug: String) {
    site: _site {
      favicon: faviconMetaTags {
        ${metaTagsFragment}
      }
    }
    blog(filter: {slug: {eq: $slug}}) {
      coverImage {
        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 750}) {
          ${responsiveImageFragment}
        }
      }
      seo: _seoMetaTags {
        ${metaTagsFragment}
      }
      title
      slug
      subtitle
      tags
      author {
        id
        name
        username
        avatar {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100})
        }
      }
      date
      ogImage: coverImage {
        url(imgixParams: {fm: jpg, fit:crop, w: 2000, h:1000})
      }
      content
    }
  }
`
