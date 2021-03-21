import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DataGrid } from '@material-ui/data-grid'
import { Paper } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Pagination from '@material-ui/lab/Pagination'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
})

function CustomPagination(props) {
  const { state, api } = props;
  const classes = useStyles();

  return (
    <Pagination
      className={classes.root}
      color="primary"
      count={state.pagination.pageCount}
      page={state.pagination.page + 1}
      onChange={(event, value) => api.current.setPage(value - 1)}
    />
  );
}

const Results = ({teachers}) => {
  console.log({teachers})
  const [alert, setAlert] = useState(false)
  const [user, setUser] = useState()

  const columns = [
    {
      field: 'avatar',
      headerName: '头像',
      renderCell: (params) => (<Avatar src={params.value} />),
      width: 70,
    },
    { field: 'username', headerName: '工号', width: 140 },
    { field: 'displayName', headerName: '昵称' },
    { field: 'wxId', headerName: '微信openID' },
    {
      field: 'id',
      headerName: '操作',
      width: 120,
      renderCell: (params) => {
        setUser(params.row)
        const editUser = () => {
          console.log('edit', params.value)
          setAlert(true)
        }
        const deleteUser = () => {
          console.log('delete', params.value)
          setAlert(true)
        }
        return (
          <div style={{ display: 'flex' }}>
            <IconButton onClick={editUser}><EditIcon /></IconButton>
            <IconButton onClick={deleteUser}><DeleteForeverIcon /></IconButton>
          </div>
        )
      }
    },
  ]

  return (
    <>
      <Paper elevation={3}>
        <div sytle={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              autoHeight
              rows={teachers}
              columns={columns}
              pageSize={10}
              checkboxSelection={false}
              disableColumnMenu
              disableSelectionOnClick
              components={{
                Pagination: CustomPagination
              }}
            />
          </div>
        </div>
      </Paper>
      <Dialog
        open={alert}
        onClose={() => setAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"删除教师"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`确定要删除教师${user?.displayName}(${user?.username})吗？`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAlert(false)}>
            取消
          </Button>
          <Button onClick={() => setAlert(false)} color="primary" autoFocus>
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default Results;
