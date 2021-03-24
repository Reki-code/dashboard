import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Grid as GridIcon,
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import { useQuery } from '@apollo/client'
import { ME } from '../../../graphql/user'
import NavItem from './NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: '信息总览'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: '教师信息'
  },
  {
    href: '/app/students',
    icon: UsersIcon,
    title: '学生信息'
  },
  {
    href: '/app/products',
    icon: GridIcon,
    title: '课程信息'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: '账号'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: '切换用户'
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  const result = useQuery(ME)

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  if (result.loading) return <div>Loading</div>
  if (result.error) return <div>Error</div>

  const user = {
    avatar: result.data.me.avatar,
    jobTitle: '管理员',
    name: result.loading ? '' : result.data.me.displayName
  }
  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
