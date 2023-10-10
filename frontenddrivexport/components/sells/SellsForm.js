import { ProductContext } from '@/context'
import { paletColors } from '@/styles/StylesConstants'
import {
  Cancel,
  NavigateNext,
  QuestionMark,
  Storefront,
} from '@mui/icons-material'
import {
  Box,
  Button,
  Chip,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import NavigatePage from '../ui/NavigatePage'

const SellsForm = ({ handleCreateInvoice }) => {
  const router = useRouter()
  const { products } = useContext(ProductContext)
  const [productNameSelected, setProductNameSelected] = useState('')
  const [productSelected, setProductSelected] = useState({})
  const [quantitySelected, setQuantitySelected] = useState('')

  const handleProductChange = (event) => {
    setProductSelected(event.target.value)
    setProductNameSelected(event.target.value)
  }

  const handleQuantityChange = (event) => {
    setQuantitySelected(event.target.value)
  }
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const handleSubmitOrder = (data) => {
    const dataToSell = {
      ...data,
      proudctId: productSelected?.product_code,
      quantityToSell: parseInt(quantitySelected),
    }
    handleCreateInvoice(dataToSell, {
      product_name: productSelected?.product_name,
      product_qty: productSelected?.product_qty - parseInt(quantitySelected),
      product_price: productSelected?.product_price,
    })
  }

  let content

  if (products.length === 0) {
    //? Aun no nay ningun product
    content = (
      <NavigatePage
        title={'No products yet'}
        buttonText={'Add a product'}
        navigateHandler={() => router.push('/product/new')}
      />
    )
  } else if (!products.some((p) => p.product_qty > 0)) {
    content = (
      <NavigatePage
        title={'Products should have a quantity to make sells'}
        buttonText={'Edit products'}
        navigateHandler={() => router.push('/')}
      />
    )
  } else {
    content = (
      <>
        <Typography
          variant="h4"
          color={paletColors.purple700}
          fontWeight="bold"
        >
          New Sell
        </Typography>

        <form
          onSubmit={handleSubmit(handleSubmitOrder)}
          style={{ width: '100%' }}
        >
          <Grid container sx={{ flexDirection: 'column' }}>
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
              <Tooltip title="Only products with quantity greater than 1 will be showed">
                <IconButton size="small">
                  <QuestionMark sx={{ height: '20px' }} />
                </IconButton>
              </Tooltip>
              <FormControl fullWidth margin="dense">
                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Select a product"
                  value={productNameSelected}
                  // {...field}
                  // error={Boolean(errors.product_selected)}
                  onChange={handleProductChange}
                >
                  {products
                    ?.filter((product) => product.product_qty > 0)
                    .map((p) => {
                      return (
                        <MenuItem key={p.product_code} value={p}>
                          {p.product_name}
                        </MenuItem>
                      )
                    })}
                </Select>
              </FormControl>
            </Grid>

            {Object.keys(productSelected).length === 0 ? (
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
                <Chip label="Select a product to continue" color="warning" />
              </Grid>
            ) : (
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
                  <InputLabel id="amount-product-select-label">
                    Quantity
                  </InputLabel>
                  <Select
                    labelId="amount-product-select-label"
                    id="auantity_to_select"
                    label="Choose a quiantity"
                    value={quantitySelected}
                    onChange={handleQuantityChange}
                  >
                    {Array.from(
                      { length: productSelected?.product_qty },
                      (_, idx) => {
                        return (
                          <MenuItem key={idx + 1} value={(idx + 1).toString()}>
                            {idx + 1}
                          </MenuItem>
                        )
                      }
                    )}
                  </Select>
                </FormControl>
              </Grid>
            )}

            {!quantitySelected &&
            Object.keys(productSelected).length ===
              0 ? null : !quantitySelected ? (
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
                <Chip label="Select quantity to continue" color="warning" />
              </Grid>
            ) : (
              <>
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
                      name="full_name"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'Name Is required',
                      }}
                      render={({ field }) => (
                        <TextField
                          id="full_name"
                          label="Full Name"
                          variant="outlined"
                          color="secondary"
                          type="text"
                          placeholder="Ej. Sheldon Cooper"
                          error={Boolean(errors.full_name)}
                          helperText={errors.full_name?.message}
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
                      name="phone_number"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'Phone Number is required',
                      }}
                      render={({ field }) => (
                        <TextField
                          id="phone_number"
                          label="Phone Number"
                          variant="outlined"
                          color="secondary"
                          type="text"
                          placeholder="Ej. 12345678"
                          error={Boolean(errors.phone_number)}
                          helperText={errors.phone_number?.message}
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
                      name="email_address"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'Email is required',
                        pattern: {
                          value: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
                          message: 'Invalid email address',
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          id="email_address"
                          label="Email"
                          variant="outlined"
                          color="secondary"
                          type="email"
                          placeholder="Ej. jhon@gmail.com"
                          error={Boolean(errors.email_address)}
                          helperText={errors.email_address?.message}
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
                      name="address"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'Address is required',
                      }}
                      render={({ field }) => (
                        <TextField
                          id="address"
                          label="Address"
                          variant="outlined"
                          color="secondary"
                          type="text"
                          placeholder="Ej. 3rd Street, New York, EU"
                          error={Boolean(errors.phone_number)}
                          helperText={errors.phone_number?.message}
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
                      name="postal_code"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: 'Postal code is required',
                      }}
                      render={({ field }) => (
                        <TextField
                          id="postal_code"
                          label="Postal Code"
                          variant="outlined"
                          color="secondary"
                          type="text"
                          placeholder="Ej. 12345"
                          error={Boolean(errors.phone_number)}
                          helperText={errors.phone_number?.message}
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
                  <Box sx={{ marginTop: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Button
                          variant="contained"
                          fullWidth
                          size="large"
                          color="error"
                          onClick={() => router.push('/')}
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
                          startIcon={<Storefront />}
                          type="submit"
                          // onClick={deleteProductHandler}
                        >
                          Save
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </>
    )
  }
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflowY: 'scroll',
          paddingBottom: 3,
        }}
      >
        {content}
      </Box>
    </>
  )
}

export default SellsForm
