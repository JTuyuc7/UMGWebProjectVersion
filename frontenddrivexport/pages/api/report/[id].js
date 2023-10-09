import { backendApi } from "@/api";

export default function handler(req, res) {
  switch (req.method) {
    case 'GET': 
      return generateReportByuser(req, res);
    default: 
      return res.status(400).json({ message: 'Invalid endpoint'})
  }
}

const generateReportByuser = async (req, res) => {
    
  const { id } = req.query
  console.log("🚀 ~ file: [id].js:16 ~ generateReportByuser ~ userId:", id)
  let responseObj = {
    statusCode: 0,
    message: '',
    reportData: {} // TODO: update if needed with more info
  }
  try {
    await backendApi.get(`/product/report/${id}`)
    responseObj.statusCode = 200
    responseObj.message = "Report generated successfully"
  } catch (error) {
    responseObj.statusCode = 500
    responseObj.message = "Unable to generate the report"
  }

  return res.status(responseObj.statusCode).json(responseObj)
}