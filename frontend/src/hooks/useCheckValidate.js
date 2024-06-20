import { useNavigate } from "react-router-dom"
import useAuthContext from "./useAuthContext"
import { useEffect } from "react";

const useCheckValidate = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useAuthContext();
    
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        dispatch({ type: 'login', payload: user });
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }, [dispatch, navigate]);
  };
 
export default useCheckValidate;