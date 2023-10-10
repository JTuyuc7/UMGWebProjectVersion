import { useReducer } from 'react'
import { ProductContext, productReducer } from './'
import { localBackendApi } from '@/api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const ProductState = {
  products: [],
  loadingProducts: true,
  singleProduct: {},
}

export const ProductProvider = ({ children }) => {
  const router = useRouter()
  const [state, dispatch] = useReducer(productReducer, ProductState)

  const getAllProductsByUser = async (userId) => {
    try {
      const {data} = await localBackendApi.get(`/products/${userId}`)
      dispatch({ type: '[PRODUCT] - products', payload: data?.products })
    } catch (error) {
      console.log(error, 'Unable to get all products')
      toast.error("Something went wrong, please try again later")
    } finally {
      dispatch({ type: '[PRODUCT] - loading', payload: false })
    }
  }

  const addNewProduct = async (productObj) => {
    try {
      const { data } = await localBackendApi.post(`/products/product`, productObj)
      toast.success(data.message)
      dispatch({ type: '[PRODUCT] - new_product', payload: data.product })
      router.push('/')
    } catch (error) {
      toast.error("Something didn't go as expected, try again later")
      console.log(error, 'Error')
    }
  }

  const startEditting = (product) => {
    dispatch({ type: '[PRODUCT] - edit', payload: product})
  }

  const cancelEditting = () => {
    dispatch({ type: '[PRODUCT] - edit', payload: {}})
  }

  const onEditNewproduct = async (userId, productId, bodyToUpdate, shouldShowNotification = true) => {
    try {
      const response = await localBackendApi.put(`/products/${userId}/${productId}`, bodyToUpdate)
      if (shouldShowNotification) {
        toast.success(response.data.message)
      }
      dispatch({ type: '[PRODUCT] - updated', payload: response.data.product })
    } catch (error) {
      toast.error('Unable to update the product')
      console.log(error.response)
    }
  }

  const startDeleting = (product) => {
    dispatch({ type: '[PRODUCT] - delete', payload: product})
  }

  const cancelDelete = () => {
    dispatch({ type: '[PRODUCT] - delete', payload: {}})
  }

  const deleteProductById = async (userId, productId) => {
    try {
      const response = await localBackendApi.delete(`/products/${userId}/${productId}`)
      toast.success(response.data.message)
      dispatch({ type: '[PRODUCT] - deleted', payload: response.data?.product_code})
    } catch (error) {
      toast.error('Something went wrong, while deleting the product')
      console.log(error.response)
    }
  } 

  const generateReportByUser = async (userId) => {
    try {
      const response = await localBackendApi.get(`/report/${userId}`)
      toast.success(response.data.message)
    } catch (error) {
      console.log(error.response, 'Unable to generate it')
      toast.error('Unable to generate the report')
    }
  }

  const createInvoiceSell = async (userId, bodyInvoice, bodyProductUpdate) => {
    try {
      const response = await localBackendApi.post(`/products/${userId}`, bodyInvoice)
      toast.success(response.data.message)
      onEditNewproduct(userId, bodyInvoice.proudctId, bodyProductUpdate, false)
      router.push('/')
    } catch (error) {
      toast.error('Unable to create the invoice :(')
      console.log(error.response)
    }
  }

  const logoutProducts = () => {
    dispatch({ type: '[PRODUCT] - logout' })
  }

  const values = {
    ...state,
    getAllProductsByUser,
    addNewProduct,
    startEditting,
    cancelEditting,
    onEditNewproduct,
    startDeleting,
    cancelDelete,
    deleteProductById,
    generateReportByUser,
    logoutProducts,
    createInvoiceSell
  }

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  )
}
