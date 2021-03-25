import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'

const AddAnnDialog = ({ send, open, setOpen }) => {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle>
        发布公告
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            title: '',
            content: '',
          }}
          validate={values => {
            const errors = {}
            return errors
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            send(values)
            setSubmitting(false)
            setOpen(false)
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Field
                component={TextField}
                name='title'
                label='标题'
                fullWidth
                autoFocus
              />
              <br />
              <Field
                component={TextField}
                name='content'
                label='内容'
                multiline
                fullWidth
              />
              <br />
              <DialogActions>
                <Button onClick={handleClose}>
                  取消
                </Button>
                <Button onClick={submitForm} color="primary" autoFocus>
                  发布
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

export default AddAnnDialog
