import { parse } from 'cookie';
import { AppLayout } from '@/components/Layouts';
import DashboardPage from '@/components/dashboard/DashboardPage';

export default function Home({user}) {

  return (
    <>
      <AppLayout title={'Drive X Port - Dashboard'}>
        <DashboardPage />
      </AppLayout>
    </>
  )
}

export async function getServerSideProps(context) {

  const { req } = context
  const cookieHeader = req.headers.cookie || ''
  const cookies = parse(cookieHeader)
  const drivexportCookie = cookies.drivexport;
  console.log("🚀 ~ file: index.js:22 ~ getServerSideProps ~ drivexportCookie:", drivexportCookie)
  console.log('Se ejecuta para traer los productos de usuario?')
  if (!drivexportCookie) { 
    return {
      redirect: {
        destination: '/auth/login', // Redirect to your login page
        permanent: false,
      }
    }
  } 

  return {
    props: {
      user: JSON.parse( decodeURIComponent(drivexportCookie)) || {}
    }
  }
}


// https://dev.to/hpouyanmehr/nextjs-mui-v5-tutorial-2k35
