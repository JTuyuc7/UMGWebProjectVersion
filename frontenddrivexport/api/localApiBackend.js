import axios from "axios";

export const localBackendApi = axios.create({
  baseURL: '/api'
})
