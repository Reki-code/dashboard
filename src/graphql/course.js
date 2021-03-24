import { gql } from '@apollo/client'

export const ALL_COURSE = gql`
  query {
    courses(searchBy: {}) {
      id
      cover
      title
      teacher {
        displayName
      }
    }
  }
`
