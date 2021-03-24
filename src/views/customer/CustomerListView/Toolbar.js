import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useMutation } from '@apollo/client'
import { ADD_USER, ALL_TEACHER } from '../../../graphql/user'
import EditUser from './EditUser'

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ filter, setFilter, className, ...rest }) => {
  const classes = useStyles();
  const [editDialog, setEditDialog] = useState(false)
  const [addUser] = useMutation(ADD_USER)
  const handleAdd = (user) => {
    const { displayName, username, password } = user
    addUser({
      variables: {
        input: { "type": "TEACHER", displayName, username, password }
      },
      update(cache, { data: { createUser } }) {
        const dataInStore = cache.readQuery({ query: ALL_TEACHER })
        cache.writeQuery({
          query: ALL_TEACHER,
          data: {
            ...dataInStore,
            users: [...dataInStore.users, createUser.user]
          }
        })
      },
    })
  }
  const handleChange = ({target}) => {
    setFilter(target.value)
  }

  return (
    <>
      <EditUser
        open={editDialog}
        setOpen={setEditDialog}
        initialValues={{
          username: '',
          password: '',
          displayName: '',
        }}
        save={handleAdd}
      />
      <div
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Box
          display="flex"
          justifyContent="flex-end"
        >
          <Button className={classes.importButton}>
            批量导入
        </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => setEditDialog(true)}
          >
            添加教师
        </Button>
        </Box>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Box maxWidth={500}>
                <TextField
                  value={filter}
                  onChange={handleChange}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="搜索教师"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
