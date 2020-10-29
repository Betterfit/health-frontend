import React from 'react';
import {createCartStore} from "Store/cartStore";
import {useLocalStore} from 'mobx-react';

const EditCartContext = React.createContext(null);

export const EditCartProvider = ({children}) => {
    const cartStore = useLocalStore(() => createCartStore("editCart"))
    return <EditCartContext.Provider value={cartStore}>
        {children}
    </EditCartContext.Provider>
}

export const useCartStore = () => React.useContext(EditCartContext);