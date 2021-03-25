import { gql } from '@apollo/client'

export const ANNOUNCEMENTS = gql`
  query {
    announcements(searchBy: {}) {
      id
      title
      content
      createdAt
    }
  }
`

export const SEND_ANN = gql`
  mutation ($title: String, $content: String) {
    createAnnouncemnt(input: {
      title: $title
      content: $content
      forAll: true
    }) {
      announcement {
        id
        title
        content
        createdAt
        forAll
      }
    }
  }
`