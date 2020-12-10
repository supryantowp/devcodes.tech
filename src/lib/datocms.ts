/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLClient } from 'graphql-request'
import tiny from 'tiny-json-http'

export function contentful() {
  return new GraphQLClient(`https://graphql.datocms.com/`, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
    },
  })
}

interface RequestProps {
  query: any
  variables?: any
  preview?: any
}

export async function request({ query, variables, preview }: RequestProps) {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`

  const { body } = await tiny.post({
    url: endpoint,
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
    },
    data: {
      query,
      variables,
    },
  })

  if (body.errors) {
    console.log('Ouch the query has some errors')
    throw body.errors
  }

  return body.data
}
