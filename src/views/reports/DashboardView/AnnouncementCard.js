import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'

const shortOptions = { month: 'long', day: 'numeric' }
const longOptions = { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
const shortFormat = (timeStamp) => new Intl.DateTimeFormat('zh-CN', shortOptions).format(timeStamp)
const longFormat = (timeStamp) => new Intl.DateTimeFormat('zh-CN', longOptions).format(timeStamp)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textAlign: 'right',
  },
  details: {
    display: 'block',
    alignItems: 'center',
  },
  column1: {
    flexBasis: '60%',
  },
  column2: {
    flexBasis: '30%',
  },
}))

const AnnouncementCard = ({ announcements }) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState()

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  }

  return <div className={classes.root}>
    {
      announcements.map((announcement) => {
        const id = announcement.id
        const date = new Date(announcement.createdAt)
        return (
          <Accordion square expanded={expanded === id} onChange={handleChange(id)} key={id}>
            <AccordionSummary>
              <div className={classes.column1}>
                <Typography className={classes.heading}>{announcement.title}</Typography>
              </div>
              <div className={classes.column2}>
                <Typography className={classes.secondaryHeading}>
                  {expanded === id ? '' : shortFormat(date)}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <div>{longFormat(date)}</div>
              <div>{announcement.content}</div>
            </AccordionDetails>
          </Accordion>
        )
      })
    }
  </div>
}

export default AnnouncementCard
