import { parse } from 'cookie'
import { AppLayout } from '@/components/Layouts'
import DashboardPage from '@/components/dashboard/DashboardPage'
import { useContext, useEffect } from 'react'
import { AuthContext, ProductContext } from '@/context'
import LoadingSkeleton from '@/components/ui/SkeletonDashboard'

export default function Home({ user }) {
  const { loadingProducts, getAllProductsByUser } = useContext(ProductContext)
  const { sessionLogginUser } = useContext(AuthContext)
  
  useEffect(() => {
    getAllProductsByUser(user.id)
    sessionLogginUser(user)
  }, [])

  return (
    <>
      <AppLayout title={'Drive X Port - Dashboard'}>
        {loadingProducts ? <LoadingSkeleton /> : <DashboardPage userId={user.id} />}
      </AppLayout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const cookieHeader = req.headers.cookie || ''
  const cookies = parse(cookieHeader)
  const drivexportCookie = cookies.drivexport

  if (!drivexportCookie) {
    return {
      redirect: {
        destination: '/auth/login', // Redirect to your login page
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: JSON.parse(decodeURIComponent(drivexportCookie)) || {},
    },
  }
}

// https://dev.to/hpouyanmehr/nextjs-mui-v5-tutorial-2k35
