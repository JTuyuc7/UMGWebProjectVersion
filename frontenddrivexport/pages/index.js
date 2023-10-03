import { AuthLayout, AppLayout } from '@/components/Layouts'
import { useRouter } from 'next/router';
import LoginPage from './auth/login';

export default function Home() {

  const isAuth = false;
  return (
    <>{!isAuth && <LoginPage />}
      { isAuth && <AppLayout />}
    </>
  )
}
// https://dev.to/hpouyanmehr/nextjs-mui-v5-tutorial-2k35
