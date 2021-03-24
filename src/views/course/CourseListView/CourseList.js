import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import CourseCard from './CourseCard'
import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'
import { useQuery } from '@apollo/client'
import { ALL_COURSE } from '../../../graphql/course'

const CourseList = ({ filter }) => {
  const coursesInfo = useQuery(ALL_COURSE)
  const [page, setPage] = useState(1)

  if (coursesInfo.loading) return <div>Loading</div>
  if (coursesInfo.error) return <div>Error</div>

  const courses = coursesInfo.data.courses
    .filter(c => c.title?.includes(filter) || c.teacher.displayName?.includes(filter))

  return <>
    <Box mt={3}>
      <Grid
        container
        spacing={3}
      >
        {
          courses.map(course => (
            <Grid
              key={course.id}
              item
              lg={4}
              md={6}
              xs={12}
            >
              <CourseCard course={course} />
            </Grid>
          ))
        }
      </Grid>
    </Box>
    <Box
      mt={3}
      display="flex"
      justifyContent="center"
    >
      <Pagination
        page={page}
        color="primary"
        count={(courses.length - 1) / 6 + 1}
        size="small"
        onChange={(event, value) => setPage(value)}
      />
    </Box>
  </>
}

export default CourseList
