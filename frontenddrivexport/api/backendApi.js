import axios from 'axios'


const backendApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_HOST}/api`
})

export default backendApi