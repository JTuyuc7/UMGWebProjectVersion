import { MainLayout, AuthLayout, AppLayout } from "@/components/Layouts"
import { ToastContainer } from "react-toastify";

export default function Home() {

  const isAuth = true;
  return (
    <>
      <MainLayout >
        { isAuth && <AppLayout />}
        { !isAuth && <AuthLayout />}
      </MainLayout>
      
    </>
  );
}

// https://dev.to/hpouyanmehr/nextjs-mui-v5-tutorial-2k35