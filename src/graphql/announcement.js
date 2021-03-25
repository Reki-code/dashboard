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
