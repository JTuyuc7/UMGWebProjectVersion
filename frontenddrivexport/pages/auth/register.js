import { AuthLayout } from '@/components/Layouts/AuthLayout'
import { AuthContext } from '@/context'
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'

const { HeaderComponent } = require('@/components/ui')

const RegisterPage = () => {
  const { registerNewUser } = useContext(AuthContext)
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const handleRegisterUser = (data) => {
    const registerObj = {}
    ;(registerObj.user_name = data.userName),
      (registerObj.last_name = data.lastName),
      (registerObj.email = data.email),
      (registerObj.password = data.password)

    registerNewUser(registerObj)
  }

  return (
    <>
      <AuthLayout>
        <HeaderComponent title={'DriveXport - Register'} />
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
            Register
          </Typography>
          <form
            style={{ width: '100%' }}
            onSubmit={handleSubmit(handleRegisterUser)}
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
                    name="userName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Name is required',
                    }}
                    render={({ field }) => (
                      <TextField
                        id="userName"
                        label="Name"
                        variant="outlined"
                        color="secondary"
                        type="text"
                        placeholder="Ej. Peter"
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
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
                    name="lastName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Last Name is required',
                    }}
                    render={({ field }) => (
                      <TextField
                        id="LastName"
                        label="Last Name"
                        variant="outlined"
                        color="secondary"
                        type="text"
                        placeholder="Ej. Smith"
                        error={Boolean(errors.LastName)}
                        helperText={errors.LastName?.message}
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
                    rules={{
                      required: 'Password is required',
                    }}
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
                    Register
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
                    Already Have an account?
                    <Link
                      style={{ color: 'whitesmoke', fontWeight: 'normal' }}
                      href={'/auth/login'}
                    >
                      {' '}
                      Login
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </AuthLayout>
    </>
  )
}

export default RegisterPage
