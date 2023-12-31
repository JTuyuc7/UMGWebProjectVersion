import { backendApi } from "@/api";

export default function handler(req, res) {
  switch (req.method) {
    case 'POST': 
      return logginUserHandler(req, res);
    default: 
      return res.status(400).json({ message: 'Invalid endpoint'})
  }
}

const logginUserHandler = async (req, res) => {
    
  const { email = '', password = '' } = req.body
  const { data } = await backendApi.post('/users/login', { email, password })

  if (data.status === 200) {
    const serializeData = JSON.stringify(data.user)
    res.setHeader('Set-Cookie', `drivexport=${encodeURIComponent(serializeData)};  Path=/; HttpOnly; Max-Age=${3600 * 1}`)
  }
  return res.status(data.status).json({ user: data.user, message: data.message })
}