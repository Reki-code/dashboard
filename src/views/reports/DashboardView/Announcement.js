import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import { useQuery, useMutation } from '@apollo/client'
import { ANNOUNCEMENTS, SEND_ANN } from '../../../graphql/announcement'
import AnnouncementCard from './AnnouncementCard'
import AddAnnDialog from './AddAnnDialog'

const Announcement = () => {
  const [open, setOpen] = useState(false)
  const announcementInfo = useQuery(ANNOUNCEMENTS)
  const [snedAnnouncement] = useMutation(SEND_ANN)
  const handleClick = () => {
    setOpen(true)
  }
  const handleSend = (values) => {
    const { title, content } = values
    snedAnnouncement({
      variables: { title, content },
      update(cache, { data: { createAnnouncemnt } }) {
        const dataInStore = cache.readQuery({ query: ANNOUNCEMENTS })
        const announcements = dataInStore.announcements
        cache.writeQuery({
          query: ANNOUNCEMENTS,
          data: {
            ...dataInStore,
            announcements: [...announcements, createAnnouncemnt.announcement]
          }
        })
      },
    })
    .catch(error => {
      console.error('error', error)
    })
  }

  if (announcementInfo.loading) return <div>Loading</div>
  if (announcementInfo.error) return <div>Error</div>

  const announcements = announcementInfo.data.announcements

  return (
    <>
      <AddAnnDialog send={handleSend} open={open} setOpen={setOpen} />
      <Card>
        <CardHeader
          action={(
            <Button
              size="small"
              variant="text"
              onClick={handleClick}
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
    </>
  )
}

export default Announcement
