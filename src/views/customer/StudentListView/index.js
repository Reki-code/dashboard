import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles()
  const [filter, setFilter] = useState('')

  return (
    <Page
      className={classes.root}
      title="学生信息"
    >
      <Container maxWidth={false}>
        <Toolbar filter={filter} setFilter={setFilter} />
        <Box mt={3}>
          <Results filter={filter} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
