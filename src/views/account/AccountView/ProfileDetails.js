import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useMutation } from '@apollo/client'
import { UPDATE_USER, ME } from '../../../graphql/user'

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ admin, className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    displayName: admin.displayName,
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const [updateUser] = useMutation(UPDATE_USER)
  const handleSave = () => {
    const { displayName } = values
    updateUser({
      variables: { input: { id: admin.id, displayName }},
      update(cache, { data: { updateUser }}) {
        const dataInStore = cache.readQuery({ query: ME })
        cache.writeQuery({
          query: ME,
          data: {
            ...dataInStore,
            me: updateUser.user,
          }
        })
      }
    })
  }

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          title="管理员信息"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="姓名"
                name="displayName"
                onChange={handleChange}
                required
                value={values.displayName}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSave}
          >
            保存
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
