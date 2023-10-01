import { AuthLayout } from "./AuthLayout";


export const MainLayout = ({ children }) => {

  const isAuth = false;

  return (
    <>
      <main>
        {children}
      </main>
    </>
  )
}
