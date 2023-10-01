import { AuthContext, authReducer } from '@/context'
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'

const { HeaderComponent, AuthWrapper } = require('@/components/ui')

const LoginPage = () => {
  const router = useRouter()
  const { loginUseer } = useContext(AuthContext)
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()
  const handleLoginUser = (data) => {
    loginUseer(data.email, data.password)
  }
  return (
    <>
      <AuthWrapper>
      <HeaderComponent title={'DriveXport - Login'} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography color={'purple'} variant="h3" sx={{ fontWeight: 'bold' }}>
          Login
        </Typography>
        <form
          style={{ width: '100%' }}
          onSubmit={handleSubmit(handleLoginUser)}
        >
          <Grid
            sx={{
              flexDirection: 'column',
            }}
            container
          >
            <Grid
              item
              xs={12}
              md={5}
              sx={{ width: '100%', alignSelf: 'center', marginTop: 3 }}
            >
              <FormControl fullWidth margin="dense">
                <Controller
                  name="email"
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
                      id="email"
                      label="Email"
                      variant="outlined"
                      color="secondary"
                      type="email"
                      placeholder="Ej. jhon@gmail.com"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
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
              sx={{ width: '100%', alignSelf: 'center', marginTop: 3 }}
            >
              <FormControl fullWidth margin="dense">
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <TextField
                      id="password"
                      label="Password"
                      variant="outlined"
                      color="secondary"
                      type="password"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
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
              sx={{ width: '100%', alignSelf: 'center' }}
            >
              <Box sx={{ marginY: 5 }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  color="secondary"
                  type="submit"
                >
                  Login
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Typography
                  variant="subtitle2"
                  textAlign={'center'}
                  fontWeight={'bold'}
                >
                  Don't have an account?
                  <Link
                    style={{ color: 'whitesmoke', fontWeight: 'normal' }}
                    href={'/auth/register'}
                  >
                    {' '}
                    Register
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </form>
        </Box>
        </AuthWrapper>
    </>
  )
}

export default LoginPage
