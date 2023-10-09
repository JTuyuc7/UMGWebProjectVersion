import { backendApi } from "@/api";
import { formatDateFn } from "@/utility/formatDate";

export default function handler(req, res) {
  switch (req.method) {
    case 'PUT': 
      return updateProductHandler(req, res);
    case 'DELETE':
      return deleteProductFromDb(req, res);
    default: 
      return res.status(400).json({ message: 'Invalid endpoint'})
  }
}

const deleteProductFromDb = async (req, res) => {
  const { params } = req.query
  const userId = params[0]
  const productId = params[1]
  let responseStatus = 0
  let responseMsg = ""
  try {
    await backendApi.delete(`/product/delete/${userId}/${productId}`)
    responseStatus = 200
    responseMsg = "Product deleted"
  } catch (error) {
    console.log(error.response)
    responseStatus = 500
    responseMsg = "Unable to procces your request at this time"
  }

  return res.status(responseStatus).json({ message: responseMsg, product_code: productId })
}

const updateProductHandler = async (req, res) => {
    
  const { product_name = '', product_qty = 0, product_price = 0 } = req.body
  const { params } = req.query
  const userId = params[0]
  const productId = params[1]

  let responseStatus = 0
  let responseMsg = ""
  let respnseObj = {}

  try {
    const response = await backendApi.put(`/product/update/${userId}/${productId}`, {product_name, product_qty, product_price})
    responseStatus = response.status
      responseMsg = "Product updated"
      respnseObj = {
        product_code: response.data.product_code,
        product_name: response.data.product_name,
        product_price: response.data.product_price,
        product_qty: response.data.product_qty,
        product_belongs_to: response.data.user.id,
        createdAt: formatDateFn(response.data.createdAt),
      }
  } catch (error) {
    responseStatus = 500
    responseMsg = "Something didn't go as expected"
    console.log(error, 'Unable to update it')
  }

  return res.status(responseStatus).json({ product: respnseObj, message: responseMsg })
}