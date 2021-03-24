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
    users(searchBy: { type: STUDENT}) {
      id
      avatar
      displayName
      username
      wxId
      password
    }
  }
`

export const UPDATE_USER = gql`
  mutation ($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        avatar
        displayName
        password
        username
        wxId
      }
    }
  }
`

export const ADD_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
        avatar
        displayName
        password
        username
        wxId
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation ($id: ID!) {
    deleteUser(input: {id: $id}) {
      user {
        id
      }
    }
  }
`
