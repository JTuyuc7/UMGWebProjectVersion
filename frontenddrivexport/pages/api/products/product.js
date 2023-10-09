import { backendApi } from '@/api'
import { formatDateFn } from '@/utility/formatDate'

export default function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return addNewProductToDb(req, res)
    default:
      return res.status(400).json({ message: 'Invalid endpoint' })
  }
}

const addNewProductToDb = async (req, res) => {
  const { product_name = '', product_price = 0, userId = 0 } = req.body

  const bodyNewProduct = {
    product_name: product_name,
    product_qty: 0,
    product_price: product_price,
    user: {
      id: userId,
    },
  }
  let statusCode = 0
  let cleanedData = {}
  let message = ''

  try {
    const response = await backendApi.post(`/product`, bodyNewProduct)

    statusCode = response.status
    message = 'Product saved correctly'
    cleanedData = {
      product_code: response.data.product_code,
      product_name: response.data.product_name,
      product_price: response.data.product_price,
      product_qty: response.data.product_qty,
      product_belongs_to: response.data.user.id,
      createdAt: formatDateFn(response.data.createdAt),
    }
  } catch (error) {
    statusCode = 500
    message = 'Something went wrong, try again later'
  }
  return res.status(statusCode).json({ product: cleanedData, message: message })
}
