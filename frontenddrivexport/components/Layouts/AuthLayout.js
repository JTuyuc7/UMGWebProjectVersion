import { Container } from '@mui/material'
import { useRouter } from 'next/router'
export const AuthLayout = ({ children, isAuth }) => {


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

export const getServerSideProps = async () => {

  const isAuth = false;

    return {
        props: {
          isAuth
        }
    }
}