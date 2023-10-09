import { ProductContext } from '@/context'
import {
  Cancel,
  Check,
  Info,
} from '@mui/icons-material'
import { useContext } from 'react'

const {
  Modal,
  Alert,
  AlertTitle,
  Box,
  Tooltip,
  Grid,
  Button,
} = require('@mui/material')

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

const ModalDelete = ({ open, handleClose }) => {

  const { singleProduct, deleteProductById } = useContext(ProductContext)

  const deleteProductHandler = () => {
    deleteProductById(singleProduct.product_belongs_to, singleProduct.product_code)
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid
        container
      sx={{ ...style, width: { md: 500, lg: 600, xs: 300, sm: 400 } }}
      >
        <Box sx={{ width: '100%' }}>
          <Alert severity="warning" variant="outlined">
            <AlertTitle>Warning</AlertTitle>
            Are you sure you want to delete <strong>{singleProduct.product_name || ''}</strong> ?
            <Tooltip
              arrow
              title="Once delete it can not be reverted"
              placement="top"
              sx={{ alignItems: 'center', mx: 2 }}
            >
              <Info />
            </Tooltip>
          </Alert>

          <Box sx={{ marginTop: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  color="error"
                  onClick={handleClose}
                  startIcon={<Cancel />}
                >
                  No, Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  color="secondary"
                  startIcon={<Check />}
                  onClick={deleteProductHandler}
                >
                  Yes, Delete
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Modal>
  )
}

export default ModalDelete
