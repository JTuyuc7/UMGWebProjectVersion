import { AppLayout } from "@/components/Layouts"
import {FormNewProduct} from "@/components/ui"
import { AuthContext, ProductContext } from "@/context"
import { parse } from "cookie"
import { useContext, useEffect } from "react"

const NewProductForm = ({ user }) => {

  const { sessionLogginUser } = useContext(AuthContext)
  const { addNewProduct } = useContext(ProductContext)

  useEffect(() => {
    sessionLogginUser(user)
  }, [])

  const handleAddNewProduct = (data) => {
    const newProductObj = {
      ...data,
      userId: user.id
    }
    addNewProduct(newProductObj)
  }

  return (
    <>
      <AppLayout title={"Drive X Port - New"}>
        <FormNewProduct handleAddNewProduct={handleAddNewProduct} />
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

export default NewProductForm