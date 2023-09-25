import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  gridClasses
} from '@mui/x-data-grid'
import { randomCreatedDate, randomTraderName, randomId, randomArrayItem } from '@mui/x-data-grid-generator'

const UsersTable = () => {
  const roles = ['Lessee', 'Lessor', 'Admin']
  const randomRole = () => {
    return randomArrayItem(roles)
  }

  const initialRows = [
    {
      id: randomId(),
      name: randomTraderName(),
      age: 25,
      joinDate: randomCreatedDate(),
      role: randomRole()
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 36,
      joinDate: randomCreatedDate(),
      role: randomRole()
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 19,
      joinDate: randomCreatedDate(),
      role: randomRole()
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 28,
      joinDate: randomCreatedDate(),
      role: randomRole()
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      role: randomRole()
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      role: randomRole()
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      email: 'huytn@gmail.com',
      role: randomRole()
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      role: randomRole()
    },

    {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      role: randomRole()
    }
  ]

  //   const EditToolbar = (props) => {
  //     const { setRows, setRowModesModel } = props

  //     const handleClick = () => {
  //       const id = randomId()
  //       setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }])
  //       setRowModesModel((oldModel) => ({
  //         ...oldModel,
  //         [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
  //       }))
  //     }

  //     return (
  //       <GridToolbarContainer>
  //         <Button color='error' startIcon={<AddIcon />} onClick={handleClick}>
  //           Add record
  //         </Button>
  //       </GridToolbarContainer>
  //     )
  //   }
  const [rows, setRows] = React.useState(initialRows)
  const [rowModesModel, setRowModesModel] = React.useState({})

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'joinDate',
      headerName: 'Join date',
      type: 'date',
      width: 120,
      editable: true
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      width: 240,
      editable: true
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Lessee', 'Lessor', 'Admin']
    },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main'
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem icon={<DeleteIcon />} label='Delete' onClick={handleDeleteClick(id)} color='inherit' />
        ]
      }
    }
  ]
  return (
    <Box
      sx={{
        height: 'auto',
        '& .actions': {
          color: 'text.secondary'
        },
        '& .textPrimary': {
          color: 'text.primary',
          textAlign: 'center'
        }
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode='row'
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        // slots={{
        //   toolbar: EditToolbar
        // }}
        // slotProps={{
        //   toolbar: { setRows, setRowModesModel }
        // }}
        sx={{
          '& .MuiDataGrid-main': {
            background: '#ffffff'
          },
          '& .MuiDataGrid-footerContainer': {
            background: '#ffffff',
            marginBottom: '1rem'
          },
          '& .MuiDataGrid-columnHeaders': {
            background: '#E3F2FD'
          },
          '& .MuiDataGrid-row.Mui-selected, .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: '#EEF2F6'
          },
          '& .MuiDataGrid-row.Mui-selected, .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus': {
            outline: 'solid #333 1px'
          }
        }}
      />
    </Box>
  )
}

export default UsersTable
