import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useQuery } from '@apollo/client'
import { ALL_TEACHER } from '../../../graphql/user'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const teacherInfo = useQuery(ALL_TEACHER)

  if (teacherInfo.loading) return <div>Loading</div>
  if (teacherInfo.error) return <div>Error</div>

  return (
    <Page
      className={classes.root}
      title="教师信息"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results teachers={teacherInfo.data.users} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
