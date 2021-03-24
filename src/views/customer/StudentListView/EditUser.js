import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import Avater from '@material-ui/core/Avatar'

const EditUser = ({ initialValues, save, open, setOpen, type }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="alert-dialog-title">{
        type === 'edit'
          ? "修改学生信息"
          : "添加学生"
      }</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validate={values => {
            const errors = {}
            if (!values.username) {
              errors.username = '学号不能为空'
            }
            if (!values.password) {
              errors.password = '密码不能为空'
            }
            return errors
          }}
          onSubmit={ async (values, { setSubmitting }) => {
            setSubmitting(true)
            save(values)
            setSubmitting(false)
            setOpen(false)
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Avater src={initialValues?.avatar} />
              <Field
                component={TextField}
                name='username'
                label='学号'
              />
              <br />
              <Field
                component={TextField}
                name='displayName'
                label='姓名'
              />
              <br />
              <Field
                component={TextField}
                type='password'
                label='密码'
                name='password'
              />
              <br />
              <DialogActions>
                <Button onClick={handleClose}>
                  取消
            </Button>
                <Button onClick={submitForm} color="primary" autoFocus>
                  保存
            </Button>
              </DialogActions>
              {isSubmitting && <LinearProgress />}
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default EditUser
