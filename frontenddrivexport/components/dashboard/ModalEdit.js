import { AuthContext, ProductContext } from '@/context'
import { Cancel, Save } from '@mui/icons-material'
import {
  Box,
  Button,
  FormControl,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ModalWrapper } from '../ui'

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

const ModalEditProduct = ({ open, handleClose }) => {
  const { singleProduct, onEditNewproduct } = useContext(ProductContext)
  const { user } = useContext(AuthContext)
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const handleSubmitEditProduct = (data) => {
    onEditNewproduct(user.id, singleProduct.product_code, data)
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Grid container
      sx={{ ...style, width: { md: 500, lg: 600, xs: 300, sm: 400 } }}>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Grid item>
            <Typography
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              variant="h6"
              fontWeight="bold"
            >
              Edit:{' '}
              <Typography sx={{ mx: 1 }}>
                {singleProduct?.product_name}
              </Typography>
            </Typography>

            <form
              style={{ marginTop: 5 }}
              onSubmit={handleSubmit(handleSubmitEditProduct)}
            >
              <FormControl fullWidth margin="dense">
                <Controller
                  shouldUnregister
                  name="product_name"
                  control={control}
                  defaultValue={singleProduct.product_name}
                  rules={{
                    required: 'Name Is required',
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={{ my: 1 }}
                      id="product_name"
                      label="Product Name"
                      variant="outlined"
                      color="secondary"
                      type="text"
                      placeholder="Ej. Mazda"
                      error={Boolean(errors.product_name)}
                      helperText={errors.product_name?.message}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <Controller
                  shouldUnregister
                  name="product_price"
                  control={control}
                  defaultValue={singleProduct.product_price}
                  rules={{
                    required: 'Product Price is required',
                    pattern: {
                      value: /^[0-9]+(\.[0-9]+)?$/, // Regular expression to allow integers and decimals
                      message: 'Invalid input. Please enter a valid number.',
                    },
                    min: '0',
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={{ my: 1 }}
                      id="product_price"
                      label="Product Price"
                      variant="outlined"
                      color="secondary"
                      type="text"
                      placeholder="Ej. 25000"
                      error={Boolean(errors.product_price)}
                      helperText={errors.product_price?.message}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <Controller
                  shouldUnregister
                  name="product_qty"
                  control={control}
                  defaultValue={singleProduct.product_qty}
                  rules={{
                    required: 'Product Price is required',
                    pattern: {
                      value: /^[0-9]+$/, // Regular expression to allow integers and decimals
                      message: 'Invalid input. Please enter a valid number.',
                    },
                    min: '0',
                  }}
                  render={({ field }) => (
                    <TextField
                      sx={{ my: 1 }}
                      id="product_qty"
                      label="Quantity"
                      variant="outlined"
                      color="secondary"
                      type="text"
                      placeholder="Ej. 5"
                      error={Boolean(errors.product_qty)}
                      helperText={errors.product_qty?.message}
                      {...field}
                    />
                  )}
                />
              </FormControl>

              <Box sx={{ my: 2 }}>
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
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      color="secondary"
                      type="submit"
                      startIcon={<Save />}
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Grid>
        </Box>
      </Grid>
    </Modal>
  )
}

export default ModalEditProduct
