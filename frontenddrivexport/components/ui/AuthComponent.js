import { Container } from '@mui/material'
export const AuthWrapper = ({ children }) => {
  return (
    <main
      style={{
        // backgroundColor: 'purple',
        flex: 1,
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="bg-img"
    >
      <Container>{children}</Container>
    </main>
  )
}
