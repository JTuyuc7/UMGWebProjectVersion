import { backendApi } from '@/api'
import { formatDateFn } from '@/utility/formatDate'

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getAllProductsByUser(req, res)
    case 'POST':
      return createNewInvoiceSell(req, res)
    default:
      return res.status(400).json({ message: 'Invalid endpoint' })
  }
}

const createNewInvoiceSell = async (req, res) => {
  const {
    full_name = '',
    phone_number = '',
    email_address = '',
    address = '',
    postal_code = '',
    proudctId = 0,
    quantityToSell = 0,
  } = req.body

  const { id } = req.query

  let responseObj = {
    responseStatus: 0,
    responseMessage: '',
    responseData: {},
  }

  try {
    const response = await backendApi.post(`/product/invoice/${id}`, {
      full_name,
      phone_number,
      email_address,
      address,
      postal_code,
      proudctId,
      quantityToSell,
    })
    responseObj.responseStatus = response.status
    responseObj.responseMessage = 'Invoice created successfully'
  } catch (error) {
    responseObj.responseStatus = 500
    responseObj.responseMessage = 'Unable to create your invoice'
    console.log(error, 'unable to create the invoice')
  }

  return res
    .status(responseObj.responseStatus)
    .json({
      message: responseObj.responseMessage,
      responseData: responseObj.responseData,
    })
}

const cleanAndTransformData = (data) => {
  return data.map((product) => {
    return {
      product_code: product.product_code,
      product_name: product.product_name,
      product_price: product.product_price,
      product_qty: product.product_qty,
      product_belongs_to: product.user.id,
      createdAt: formatDateFn(product.createdAt),
    }
  })
}

const getAllProductsByUser = async (req, res) => {
  const { id } = req.query
  try {
    let message = ''
    let formatedData = []
    const data = await backendApi.get(`/product/all/${id}`)
    if (data.data.length > 0) {
      message = 'User products'
      formatedData = cleanAndTransformData(data.data)
    } else {
      message = 'User does not have products yet'
    }
    return res.status(200).json({ message: message, products: formatedData })
  } catch (error) {
    console.log(error, 'unable to get products')
    return res
      .status(404)
      .json({ message: 'Something went wrong, try again later' })
  }
}
