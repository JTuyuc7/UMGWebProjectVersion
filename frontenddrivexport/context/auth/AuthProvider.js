import { useReducer } from "react"
import { AuthContext, authReducer } from "./"
import { driveXportApi } from "@/api"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const AuthState = {

  isLoggedin: false,
  isSuperAdmin: false,
  token: '',
  user: {
    
  }
}

export const AuthProvier = ({ children }) => {
  const router = useRouter();
  
  const [state, dispatch] = useReducer(authReducer, AuthState)  
  
  const loginUseer = async (email, password) => {

    try {
      const { data } = await driveXportApi.post('/users/login', { email, password })
      console.log("🚀 ~ file: AuthProvider.js:26 ~ loginUseer ~ data:", data)
      if (data.status === 400) { 
        toast.error(data.message)
        return
      }

      if (data.status === 200) { 
        // toast.success('Welcome')
        // window.history.replaceState(null, '', '/')
        router.replace('/app')
      }

    } catch (error) {
      console.log(error, 'Unable to log in')
      toast.error('Something went wrong, try again later')
    }
  }

  const registerNewUser = async (dataBody) => {
    try {
      const { data } = await driveXportApi.post('/users', dataBody)
      
      if (data.status === 201) { 
        toast.success(data.message)
        //TODO: guardar la sesion del usuario
        router.replace('/app')
        return
      }
      if (data.status === 422) { 
        toast.warning(data.message)
        return
      }
    } catch (error) {
      console.log(error, 'Error while registering the user')
      toast.error("Unable to create your account, try again later")
    }
  }

  const values = {
    ...state,
    loginUseer,
    registerNewUser
  }
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}