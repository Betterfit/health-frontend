import React, {createContext, useState} from 'react'
// import Cookies from 'js-cookie'

export const UserAuthContext = createContext({})

export const UserAuthProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    
    const addUserData = (data) =>{
        setUserData(data);
    }
    const removeUserData = (data) => {
        setUserData(null);
    }
    return <UserAuthContext.Provider value={{userData}}>
        {children}  
    </UserAuthContext.Provider> 
}