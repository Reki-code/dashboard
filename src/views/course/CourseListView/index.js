import React, { useState } from 'react';
import {
  Container,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import CourseList from './CourseList'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const ProductList = () => {
  const classes = useStyles()
  const [filter, setFilter] = useState('')
  console.log(filter)

  return (
    <Page
      className={classes.root}
      title="课程信息"
    >
      <Container maxWidth={false}>
        <Toolbar filter={filter} setFilter={setFilter} />
        <CourseList filter={filter} />
      </Container>
    </Page>
  );
};

export default ProductList;
