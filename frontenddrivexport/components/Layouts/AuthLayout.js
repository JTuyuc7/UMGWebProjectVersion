import LoginPage from '@/pages/auth/login'
import { AuthWrapper } from '../ui'
import { Box } from '@mui/material'

export const AuthLayout = ({children}) => {
  return (
    <>
      <AuthWrapper>
        {children}
      </AuthWrapper>
    </>
  )
}
