

export default function handler(req, res) {
  
  console.log(req, 'cuando llega aca')

  switch (req.method) {
    case 'POST': 
      return logginWithApi(req, res);
    default: 
      return res.status(400).json({ message: 'Invalid endpoint'})
  }
}
