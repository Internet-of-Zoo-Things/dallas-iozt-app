import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'

export default function createApolloClient(initialState, ctx) {
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: new HttpLink({
      uri: `${process.env.URL}/graphql`,
      credentials: 'include',
      headers: {
        cookie: ctx && ctx.req && ctx.req.headers.cookie
      },
      fetch
    }),
    cache: new InMemoryCache().restore(initialState)
  })
}
