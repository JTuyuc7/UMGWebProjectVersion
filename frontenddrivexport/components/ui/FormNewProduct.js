import { paletColors } from '@/styles/StylesConstants'
import { Controller, useForm } from 'react-hook-form'

const {
  Box,
  Typography,
  Grid,
  FormControl,
  TextField,
  Button,
  Chip,
} = require('@mui/material')

export const FormNewProduct = ({handleAddNewProduct}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const handleNewProduct = (data) => {
    handleAddNewProduct(data)
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 5,
      }}
    >
      <Typography variant="h5" fontWeight="bold" color={paletColors.purple700}>
        New Product
      </Typography>
      <form onSubmit={handleSubmit(handleNewProduct)} style={{ width: '100%' }}>
        <Grid
          container
          sx={{
            flexDirection: 'column',
          }}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              width: '100%',
              alignSelf: 'center',
              marginTop: 3,
            }}
          >
            <FormControl fullWidth margin="dense">
              <Controller
                name="product_name"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Name Is required',
                }}
                render={({ field }) => (
                  <TextField
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
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              width: '100%',
              alignSelf: 'center',
              marginTop: 3,
            }}
          >
            <FormControl fullWidth margin="dense">
              <Controller
                name="product_price"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Product Price is required',
                  pattern: {
                    value: /^[0-9]+(\.[0-9]+)?$/, // Regular expression to allow integers and decimals
                    message: 'Invalid input. Please enter a valid number.',
                  },
                }}
                render={({ field }) => (
                  <TextField
                    id="product_price"
                    label="Product Price"
                    variant="outlined"
                    color="secondary"
                    type="text"
                    placeholder="Ej. 5"
                    error={Boolean(errors.product_price)}
                    helperText={errors.product_price?.message}
                    {...field}
                  />
                )}
              />
            </FormControl>
            {
              !Boolean(errors.product_price) && !Boolean(errors.product_name) && (

                <Chip
                  label="By default all products have a quantity of 0"
                  color="info"
                  variant="filled"
                  sx={{ marginTop: 2 }}
                />
              )
            }
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            sx={{ width: '100%', alignSelf: 'center', display: 'flex' }}
          >
            <Box sx={{ marginY: 5, width: '100%' }}>
              <Button
                variant="contained"
                fullWidth
                size="large"
                color="secondary"
                type="submit"
                disabled={
                  Boolean(errors.product_price) || Boolean(errors.product_name)
                }
              >
                Save product
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}
