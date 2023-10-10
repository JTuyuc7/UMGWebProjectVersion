import { AppLayout } from "@/components/Layouts"
import SellsForm from "@/components/sells/SellsForm"
import { AuthContext, ProductContext } from "@/context"
import { parse } from "cookie"
import { useContext, useEffect } from "react"

const NewSellForm = ({ user }) => {

  const { getAllProductsByUser, createInvoiceSell } = useContext(ProductContext)
  const { sessionLogginUser } = useContext(AuthContext)
  
  useEffect(() => {
    getAllProductsByUser(user.id)
    sessionLogginUser(user)
  }, [])

  const handleCreateInvoice = (invoiceObj, updateObj) => {
    createInvoiceSell(user.id, invoiceObj, updateObj)
  }

  return (
    <>
      <AppLayout title={"Drive X Port - Sell"}>
        <SellsForm handleCreateInvoice={handleCreateInvoice} />
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
      // user: {},
    },
  }
}

export default NewSellForm