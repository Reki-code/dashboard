import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import Password from './Password'
import { useQuery } from '@apollo/client'
import { ME } from '../../../graphql/user'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  content: {
    paddingLeft: 8,
    paddingRight: 8,
    display: 'grid',
    gap: 16,
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: 'auto',
    gridTemplateAreas: `
      'profile details'
      'password details'
    `,
  },
  profile: {
    gridArea: 'profile',
  },
  details: {
    gridArea: 'details',
  },
  password: {
    gridArea: 'password',
  }
}));

const Account = () => {
  const classes = useStyles()
  const adminInfo = useQuery(ME)

  if (adminInfo.loading) return <div>Loading</div>
  if (adminInfo.error) {
    console.log({ adminInfo })
    return <div>Error</div>
  }

  const admin = adminInfo.data.me

  return (
    <Page
      className={classes.root}
      title="账号信息"
    >
      <div className={classes.content}>
        <Profile admin={admin} className={classes.profile} />
        <ProfileDetails admin={admin} className={classes.details} />
        <Password admin={admin} className={classes.password} />
      </div>
    </Page>
  );
};

export default Account;
