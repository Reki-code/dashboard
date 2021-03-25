import { gql } from '@apollo/client'

export const COUNT = gql`
  query {
    countCourse
    countTeacher
    countStudent
  }
`
