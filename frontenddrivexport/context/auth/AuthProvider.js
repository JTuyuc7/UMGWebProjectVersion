import { useReducer } from "react"
import { AuthContext, authReducer } from "./"
import { driveXportApi, localBackendApi } from "@/api"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const AuthState = {

  isLoggedin: false,
  isSuperAdmin: false,
  token: '',
  user: {},
  // userId: null,
  // userFullName: ''
}

export const AuthProvier = ({ children }) => {
  const router = useRouter();
  
  const [state, dispatch] = useReducer(authReducer, AuthState)  
  
  const loginUseer = async (email, password) => {

    try {
      const data = await localBackendApi.post('/auth/login', { email, password })
      toast.success("Welcome back")
      dispatch({ type: '[AUTH] - login', payload: data.data.user })
      router.replace('/')
    } catch (error) {
      console.log(error.response, 'Unable to log in')
      toast.warning(error.response.data.message || 'Opps, something went wrong, try again later')
    }
  }

  const registerNewUser = async (dataBody) => {
    try {
      const data = await localBackendApi.post('/auth/register', dataBody)
      toast.success(data.data.message)
      dispatch({ type: '[AUTH] - login', payload: data.data.user })
      router.replace('/')
    } catch (error) {
      console.log(error, 'Error while registering the user')
      toast.warning(error.response.data.message)
    }
  }

  const sessionLogginUser = (user) => {
    dispatch({ type: '[AUTH] - login', payload: user })
  }


  const values = {
    ...state,
    loginUseer,
    registerNewUser,
    sessionLogginUser
  }
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}