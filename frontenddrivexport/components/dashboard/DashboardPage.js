import { DataGrid } from '@mui/x-data-grid'
import { AssessmentOutlined, CreateOutlined, DeleteOutline } from '@mui/icons-material'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { ProductContext } from '@/context'
import ModalEditProduct from './ModalEdit'
import ModalDelete from './ModalDelete'
import { paletColors } from '@/styles/StylesConstants'

const DashboardPage = ({userId}) => {
  const {
    products,
    startEditting,
    cancelEditting,
    startDeleting,
    cancelDelete,
    generateReportByUser
  } = useContext(ProductContext)
  const [openModal, setOpenModal] = useState(false)
  const [modalCancel, setModalCancel] = useState(false)
  const onHandlerClose = () => {
    cancelEditting()
    setOpenModal(false)
  }

  const handleEditModal = (data) => {
    startEditting(data)
    setOpenModal(true)
  }

  const onHandleCloseDelete = () => {
    cancelDelete()
    setModalCancel(false)
  }

  const onHandleDeleteProduct = (product) => {
    startDeleting(product)
    setModalCancel(true)
  }

  const handleGenerateReport = () => {
    generateReportByUser(userId)
  }

  const columns = [
    {
      field: 'product_code',
      headerName: 'Product Code',
      editable: false,
    },
    {
      field: 'product_name',
      headerName: 'Product Name',
      type: 'string',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'product_price',
      headerName: 'Product Price',
      type: 'number',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'product_qty',
      headerName: 'Product Quantity',
      type: 'number',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'product_belongs_to',
      headerName: 'User ID',
      type: 'number',
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Last Modified',
      type: 'string',
      width: 250,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },

    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: ({ row }) => {
        return (
          <Stack direction="row" spacing={2}>
            <IconButton aria-label="edit" onClick={() => handleEditModal(row)}>
              <CreateOutlined sx={{ color: paletColors.purple700}}/>
            </IconButton>

            <IconButton
              aria-label="delete"
              onClick={() => onHandleDeleteProduct(row)}
            >
              <DeleteOutline sx={{ color: paletColors.purple700}} />
            </IconButton>
          </Stack>
        )
      },
    },
  ]

  return (
    <>
      <Box
        sx={{
          height: '95%',
          width: '100%',
        }}
      >
        <Box
          sx={{ justifyContent: 'space-between', display: 'flex'}}
        >
          <Typography variant="h5">All Products</Typography>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<AssessmentOutlined />}
            disabled={products.lenght < 0}
            onClick={handleGenerateReport}
          >Genereate Report</Button>
        </Box>
        <DataGrid
          getRowId={(row) => row.product_code}
          rows={products}
          columns={columns}
        />

        <ModalEditProduct open={openModal} handleClose={onHandlerClose} />
        <ModalDelete open={modalCancel} handleClose={onHandleCloseDelete} />
      </Box>
    </>
  )
}

export default DashboardPage
