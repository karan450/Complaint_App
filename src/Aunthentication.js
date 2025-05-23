
import { useState, createContext, useContext } from "react";

const AuthContext = createContext(null)


export const Authprovider = ({children}) =>{

    const [user, setUser ] = useState(localStorage.getItem("username") || null);
    
    function login(user){
        localStorage.setItem("username", user)
        setUser(user);
    }

    function logout(){
        setUser(localStorage.removeItem("username"));
    }

    return(
        <AuthContext.Provider value={{user, login, logout, setUser}}>
            {children}
        </AuthContext.Provider>

        )
}

export const useAuth = () =>{
    return useContext(AuthContext);
}