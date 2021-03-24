import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles, Button, TextField
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { useMutation } from '@apollo/client'
import { CHANGE_PASSWORD } from '../../../graphql/user'

const useStyles = makeStyles(({
  root: {}
}));

const Password = ({ admin, className, ...rest }) => {
  const classes = useStyles();
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState('')
  const [warning, setWarning] = useState()
  const [changePassword] = useMutation(CHANGE_PASSWORD)
  const [values, setValues] = useState({
    old: '',
    new: '',
    confirm: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }
  const handleConfirmChange = ({ target: { value } }) => {
    setError(values.new !== value)
    setValues({
      ...values,
      confirm: value
    })
  }
  const success = () => {
    setWarning('success')
    setAlert('修改成功')
    setValues({
      old: '',
      new: '',
      confirm: '',
    })
    setOpen(true)
  }
  const failed = () => {
    setWarning('warning')
    setAlert('密码错误')
    setOpen(true)
  }
  const handleSave = () => {
    changePassword({
      variables: { new: values.new, old: values.old }
    })
      .then(({data: { changePassword: res }}) => {
        if (res.success) {
          success()
        } else {
          failed()
        }
      })
      .catch(() => failed())
      .finally(() => setTimeout(() => { setOpen(false) }, 1500))
  }

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={warning} onClose={() => setOpen(false)}>
          {alert}
        </Alert>
      </Snackbar>
      <Card>
        <CardHeader
          title="修改密码"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="旧密码"
            margin="normal"
            name="old"
            onChange={handleChange}
            type="password"
            value={values.old}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="新密码"
            margin="normal"
            name="new"
            onChange={handleChange}
            type="password"
            value={values.new}
            variant="outlined"
          />
          <TextField
            error={error}
            fullWidth
            label="确认新密码"
            helperText={error ? "输入密码不一致" : ''}
            margin="normal"
            name="confirm"
            onChange={handleConfirmChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
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
            disabled={
              error
              || values.old === ''
              || values.new === ''
              || values.confirm === ''
            }
          >
            修改
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
