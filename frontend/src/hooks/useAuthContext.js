import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
    const value = useContext(AuthContext)
    if (!value) {
        console.log("Cannot Access The AuthContext")
    }
    return value
}

export default useAuthContext;