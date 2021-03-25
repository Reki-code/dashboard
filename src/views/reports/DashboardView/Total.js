import React from 'react'
import clsx from 'clsx'
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
} from '@material-ui/core'

const Total = ({ info, className, ...rest }) => {
  const useStyles = makeStyles(() => ({
    root: {
      height: '100%'
    },
    avatar: {
      backgroundColor: info.color ?? colors.orange[400],
      height: 56,
      width: 56
    }
  }))
  const classes = useStyles()

  return (
    <Grid
      item
      lg={3}
      sm={6}
      xl={3}
      xs={12}
    >
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardContent>
          <Grid
            container
            justify="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                {info.title}
              </Typography>
              <Typography
                color="textPrimary"
                variant="h3"
              >
                {info.number}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                {info.icon}
              </Avatar>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default Total
