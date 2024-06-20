import { createContext, useReducer } from "react";

export const AuthContext = createContext()

const reducer = (state, action) => {
    if (action.type === "login") {
        return { user: action.payload };
    } else if (action.type === "logout") {
        return { user: null };
    } else {
        return state;
    }
};


export const AuthContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, {
        user: null
    })

    return ( 
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
     );
}
 
