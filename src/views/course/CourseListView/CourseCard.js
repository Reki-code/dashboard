import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
  subtitle: {
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.secondary,
  }
}))

const CourseCard = ({ course }) => {
  const classes = useStyles()
  const handleClick = () => {
   console.log('click course')
  }

  return (
    <Card onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={course.cover}
        />
        <CardContent>
          <Typography gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {course.teacher.displayName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CourseCard
