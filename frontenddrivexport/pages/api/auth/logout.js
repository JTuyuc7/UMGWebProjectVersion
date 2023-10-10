import { backendApi } from "@/api";
import { parse, serialize } from "cookie";

export default function handler(req, res) {
  switch (req.method) {
    case 'POST': 
      return logoutUserHandler(req, res);
    default: 
      return res.status(400).json({ message: 'Invalid endpoint'})
  }
}

const logoutUserHandler = async (req, res) => {
  const response = await backendApi.post(`/users/logout`)
  if (response.status === 200) {
    const serializeData = JSON.stringify({})
    res.setHeader('Set-Cookie', `drivexport=${encodeURIComponent(serializeData)};  Path=/; HttpOnly; Max-Age=${3600 * 0}`)
  }
  return res.status(200).json({ message: "Logout successfully" })
}