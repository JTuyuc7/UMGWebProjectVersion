import { backendApi } from "@/api";

export default function handler(req, res) {
  switch (req.method) {
    case 'POST': 
      return registerUserHandler(req, res);
    default: 
      return res.status(400).json({ message: 'Invalid endpoint'})
  }
}

const registerUserHandler = async (req, res) => {
    
  const { email = '', password = '', user_name = '',  last_name = ''} = req.body
  const { data } = await backendApi.post('/users', {user_name, last_name,  email, password })

  if (data.status === 201) {
    const serializeData = JSON.stringify(data.user)
    res.setHeader('Set-Cookie', `drivexport=${encodeURIComponent(serializeData)};  Path=/; HttpOnly; Max-Age=${3600 * 1}`)
  }

  return res.status(data.status).json({ user: data.user, message: "Account created"})
}