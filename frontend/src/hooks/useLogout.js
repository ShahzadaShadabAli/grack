import useAuthContext from "./useAuthContext"
import {useNavigate} from "react-router-dom"

const useLogout = () => {
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()
   const logout = () => {
     //Empty the localstorage
     localStorage.removeItem('user')

     //Empty the global static
     dispatch({type: "logout"})
 
     navigate('/')
   }

   return logout

}

export default useLogout