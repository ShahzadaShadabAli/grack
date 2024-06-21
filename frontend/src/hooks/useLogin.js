import { useState } from "react"
import axios from "axios";
import useAuthContext from "./useAuthContext";
import useCheckValidate from "./useCheckValidate";
import { useNavigate } from "react-router-dom";


const useLogin = () => {
     const { state, dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const login = async (email, password) => {
        setError(null);
        setIsLoading(true);
        try {
            console.log("Waiting");
            const response = await axios.post('https://grack.vercel.app/users/login', { email, password });
            console.log(response.data);

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setIsLoading(false);
                dispatch({ type: "login", payload: response.data });
                navigate('/dashboard');
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            console.error(error); // Log the error for debugging
            if (error.response) {
                if (error.response.status === 400) {
                    setError(error.response.data);
                } else {
                    setError(`Error: ${error.response.status} - ${error.response.statusText}`);
                }
            } else {
                setError(error.message);
            }
            setIsLoading(false);
        }
    }

    return {login, error, isLoading}

}

export default useLogin
