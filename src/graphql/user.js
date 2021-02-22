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
    }
  }
`

export const ALL_TEACHER = gql`
  query {
    users(type: TEACHER) {
      id
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
