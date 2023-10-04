import LoginPage from './auth/login';
import DashboardApp from './app';

export default function Home() {

  const isAuth = true;


  return (
    <>{!isAuth && <LoginPage />}
      { isAuth && <DashboardApp />}
    </>
  )
}
// https://dev.to/hpouyanmehr/nextjs-mui-v5-tutorial-2k35
