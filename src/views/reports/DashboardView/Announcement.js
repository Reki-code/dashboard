import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import { useQuery } from '@apollo/client'
import { ANNOUNCEMENTS } from '../../../graphql/announcement'
import AnnouncementCard from './AnnouncementCard'

const Announcement = () => {
  const announcementInfo = useQuery(ANNOUNCEMENTS)

  if (announcementInfo.loading) return <div>Loading</div>
  if (announcementInfo.error) return <div>Error</div>

  const announcements = announcementInfo.data.announcements
  console.log({announcements})

  return (
    <Card>
      <CardHeader
        action={(
          <Button
            size="small"
            variant="text"
          >
            发布公告
          </Button>
        )}
        title="学堂公告"
      />
      <Divider />
      <CardContent style={{ padding: 0 }}>
        <Box
          height={400}
          position="relative"
        >
          <AnnouncementCard announcements={announcements} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default Announcement
