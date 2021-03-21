import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      displayName
      avatar
    }
  }
`

export const ALL_TEACHER = gql`
  query {
    users(searchBy: { type: TEACHER}) {
      id
      avatar
      displayName
      username
      wxId
      password
    }
  }
`
export const ALL_STUDENT = gql`
  query {
    users(type: STUDENT) {
      id
    }
  }
`
