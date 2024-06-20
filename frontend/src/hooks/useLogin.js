import { useState } from "react"
import axios from "axios";
import useAuthContext from "./useAuthContext";
import useCheckValidate from "./useCheckValidate";
import { useNavigate } from "react-router-dom";


const useLogin = () => {
    const {state, dispatch} = useAuthContext()
    const [isLoading, setIsloading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const login = async (email, password) => {
        setError(null)
        setIsloading(true)
        try {
            const response = await axios.post('https://grack.vercel.app/users/login', {email, password})
            if (response.statusText == "OK") {
                localStorage.setItem('user', JSON.stringify(response.data))
                setIsloading(false)
                dispatch({type: "login", payload: response.data})
                navigate('/dashboard')
            }
        } catch (error) {
            if (error.response.statusText == 'Bad Request') {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
            setIsloading(false)
        }
    }

    return {login, error, isLoading}

}

export default useLogin
