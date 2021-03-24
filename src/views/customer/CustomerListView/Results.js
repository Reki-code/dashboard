import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DataGrid, GridToolbarContainer } from '@material-ui/data-grid'
import { Paper } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Pagination from '@material-ui/lab/Pagination'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import EditUser from './EditUser'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { ALL_TEACHER } from '../../../graphql/user'
import { UPDATE_USER } from '../../../graphql/user'
import { DELETE_USER } from '../../../graphql/user'

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

const columns = [
  {
    field: 'avatar',
    headerName: '头像',
    renderCell: (params) => (<Avatar src={params.value} />),
    width: 70,
  },
  { field: 'username', headerName: '工号', width: 140 },
  { field: 'displayName', headerName: '姓名' },
  { field: 'wxId', headerName: '微信openID' },
]

const Results = () => {
  const [alert, setAlert] = useState(false)
  const [editDialog, setEditDialog] = useState(false)
  const [user, setUser] = useState(null)
  const teacherInfo = useQuery(ALL_TEACHER)
  const [updateUser] = useMutation(UPDATE_USER)
  const [deleteUser] = useMutation(DELETE_USER)

  if (teacherInfo.loading) return <div>Loading</div>
  if (teacherInfo.error) return <div>Error</div>

  const teachers = teacherInfo.data.users

  const handleSave = (user) => {
    const { id, displayName, username, password } = user
    updateUser({
      variables: {
        input: { id, displayName, username, password }
      },
      update(cache, { data: { updateUser }}) {
        const dataInStore = cache.readQuery({ query: ALL_TEACHER })
        const users = dataInStore.users.filter(u => u.id !== updateUser.user.id)
        cache.writeQuery({
          query: ALL_TEACHER,
          data: {
            ...dataInStore,
            users: [...users, updateUser.user]
          }
        })
      },
    })
  }
  const handleDelete = () => {
    deleteUser({
      variables: {
        id: user.id
      },
      update(cache, { data: { deleteUser }}) {
        const dataInStore = cache.readQuery({ query: ALL_TEACHER })
        const users = dataInStore.users.filter(u => u.id !== deleteUser.user.id)
        cache.writeQuery({
          query: ALL_TEACHER,
          data: {
            ...dataInStore,
            users
          }
        })
      }
    })
    setUser(null)
    setAlert(false)
  }

  const editUser = () => {
    setEditDialog(true)
  }
  const CustomToolbar = () => {
    if (!user) return null
    return (
      <GridToolbarContainer>
        <Button
          onClick={editUser}
          startIcon={<EditIcon />}
        >
          修改
        </Button>
        <Button
          onClick={() => setAlert(true)}
          startIcon={<DeleteIcon />}
        >
          删除
        </Button>
      </GridToolbarContainer>
    )
  }

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
              components={{
                Toolbar: CustomToolbar,
                Pagination: CustomPagination,
              }}
              onSelectionModelChange={({ selectionModel }) => {
                setUser(teachers.find(teacher => teacher.id === selectionModel[0]))
              }}
            />
          </div>
        </div>
      </Paper>

      <Dialog
        open={alert}
        onClose={() => setAlert(false)}
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
          <Button onClick={handleDelete} color="primary" autoFocus>
            删除
          </Button>
        </DialogActions>
      </Dialog>
      
      <EditUser type={'edit'} open={editDialog} setOpen={setEditDialog} initialValues={user} save={handleSave} />
    </>
  )
}

export default Results;
