import { useState } from 'react'
import { AppLayout } from '@/components/Layouts'
import { DataGrid } from '@mui/x-data-grid'
import { CreateOutlined, DeleteOutline } from '@mui/icons-material'
import { initialTempData } from '@/components/dashboard/constants'
import { Box, IconButton, Stack, Typography } from '@mui/material'
import { driveXportApi } from '@/api'
import userValidationCookie from '@/utils/checkValidInfo'
import { useRouter } from 'next/router'

const initialTempData1 = [
  {
    product_code: 3,
    product_name: 'Prueba',
    product_price: 300,
    product_qty: 0,
    product_belongs_to: 1,
    created_at: '2023-09-24 22:32:07.233000',
  },
  {
    product_code: 4,
    product_name: 'Prueba 1',
    product_price: 300,
    product_qty: 0,
    product_belongs_to: 1,
    created_at: '2023-09-24 22:32:07.233000',
  },
  {
    product_code: 5,
    product_name: 'A Prueba',
    product_price: 300,
    product_qty: 0,
    product_belongs_to: 1,
    created_at: '2023-09-24 22:32:07.233000',
  },
  {
    product_code: 6,
    product_name: 'Prueba --',
    product_price: 300,
    product_qty: 0,
    product_belongs_to: 1,
    created_at: '2023-09-24 22:32:07.233000',
  },
  {
    product_code: 7,
    product_name: 'Prueba 8',
    product_price: 300,
    product_qty: 0,
    product_belongs_to: 1,
    created_at: '2023-09-24 22:32:07.233000',
  },
  {
    product_code: 8,
    product_name: 'Prueba 7',
    product_price: 300,
    product_qty: 0,
    product_belongs_to: 1,
    created_at: '2023-09-24 22:32:07.233000',
  },
  {
    product_code: 9,
    product_name: 'Prueba',
    product_price: 300,
    product_qty: 0,
    product_belongs_to: 1,
    created_at: '2023-09-24 22:32:07.233000',
  },
]

const DashboardPage = () => {
  const [rows, setRows] = useState(initialTempData)
  const columns = [
    {
      field: 'product_code',
      headerName: 'Product Code',
      //width: 80,
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
      //width: 50,
      align: 'left',
      headerAlign: 'left',
      editable: false,
    },
    {
      field: 'created_at',
      headerName: 'Last Modified',
      type: 'string',
      width: 200,
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
            <IconButton
              aria-label="edit"
              onClick={() => console.log('Edit', row.product_code)}
            >
              <CreateOutlined color="red" />
            </IconButton>

            <IconButton
              aria-label="delete"
              onClick={() => console.log('delete', row.product_code)}
            >
              <DeleteOutline color="red" />
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
          <Typography variant="h5">All Products</Typography>
          <DataGrid
            getRowId={(row) => row.product_code}
            rows={rows}
            columns={columns}
          />
        </Box>
    </>
  )
}


export default DashboardPage
