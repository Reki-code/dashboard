import React from 'react';
import {
  Container,
  Grid,
  makeStyles,
  colors,
} from '@material-ui/core';
import Page from 'src/components/Page';
import Announcement from './Announcement'
import Total from './Total'
import { useQuery } from '@apollo/client'
import { COUNT } from '../../../graphql/info'
import PeopleIcon from '@material-ui/icons/PeopleOutlined'
import AppsIcon from '@material-ui/icons/Apps'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles()
  const info = useQuery(COUNT)

  return (
    <Page
      className={classes.root}
      title="信息总览"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Total info={{
            title: '教师总数',
            number: info.data?.countTeacher,
            color: colors.orange[500],
            icon: <PeopleIcon />,
          }} />
          <Total info={{
            title: '课程总数',
            number: info.data?.countCourse,
            color: colors.blue[500],
            icon: <AppsIcon />,
          }} />
          <Total info={{
            title: '学生总数',
            number: info.data?.countStudent,
            color: colors.deepOrange[500],
            icon: <PeopleIcon />,
          }} />

          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Announcement />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
