const { useState, useEffect } = require("react")
import Cookies from "js-cookie"

const userValidationCookie = () => {

  const [userInfo, setUserInfo] = useState(null)
  
  useEffect(() => {
    const userInfoCookie = Cookies.get('drivexportcookie')
    if (userInfoCookie) {
      try {
        const parseData = JSON.parse(userInfoCookie)
        setUserInfo(parseData)
      } catch (error) {
        console.log(error, 'Unable to parse cookie data')
      }
    }
  }, [])

  return userInfo 
}

export default userValidationCookie