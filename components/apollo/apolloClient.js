import {
  ApolloClient, InMemoryCache, HttpLink, split
} from '@apollo/client'
import fetch from 'isomorphic-unfetch'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'

export default function createApolloClient(initialState, ctx) {
  const wsLink = process.browser ? new WebSocketLink({
    uri: `ws://localhost:${process.env.PORT}/subscriptions`,
    options: {
      reconnect: true
    }
  }) : null
  const httpLink = new HttpLink({
    uri: `http://localhost:${process.env.PORT}/graphql`,
    credentials: 'include',
    headers: {
      cookie: ctx && ctx.req && ctx.req.headers.cookie
    },
    fetch
  })

  // The split function takes three parameters:
  //
  // * A function that's called for each operation to execute
  // * The Link to use for an operation if the function returns a "truthy" value
  // * The Link to use for an operation if the function returns a "falsy" value
  const splitLink = process.browser ? split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition'
        && definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  ) : httpLink

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: splitLink,
    cache: new InMemoryCache().restore(initialState)
  })
}
