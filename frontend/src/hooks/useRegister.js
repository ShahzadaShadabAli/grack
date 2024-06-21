import axios from "axios"
import { useState } from "react"
import useAuthContext from "./useAuthContext"
import { useNavigate } from "react-router-dom"

const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const {dispatch} = useAuthContext()

    const navigate = useNavigate()
    const register = async (name, email, password) => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await axios.post('https://grack.vercel.app/users/register', {name, email, password})
            if (response.status === 200) {
                setIsLoading(false)
                localStorage.setItem('user', JSON.stringify(response.data))
                dispatch({type: 'login', payload: response.data})
                navigate('/dashboard')
            }
        } catch (error) {
            if (error.response.statusText === 'Bad Request') {
                setError(error.response.data)
            } else {
                setError(error.message)
            }
            setIsLoading(false)
        }
    }

    return {register, error, isLoading, setError}
}

export default useRegister
