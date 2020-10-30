import React from 'react';
import {createAuthStore} from "Store/authStore";
import {useLocalStore} from 'mobx-react';

const AuthContext = React.createContext(null);

export const AuthProvider = ({children}) => {
    const authStore = useLocalStore(createAuthStore)
    return <AuthContext.Provider value={authStore}>
        {children}
    </AuthContext.Provider>
}

export const useAuthStore = () => React.useContext(AuthContext);