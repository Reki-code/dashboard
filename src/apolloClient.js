import {
  ApolloClient, InMemoryCache, HttpLink
} from '@apollo/client'
import { setContext } from 'apollo-link-context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: process.env.REACT_APP_APOLLO_SERVER })

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default client
