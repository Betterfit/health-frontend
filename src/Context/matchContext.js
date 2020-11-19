import React from 'react';
import {createMatchStore} from "Store/matchStore";
import {useLocalStore} from 'mobx-react';

const MatchContext = React.createContext(null);

export const MatchProvider = ({children}) => {
    const matchStore = useLocalStore(createMatchStore)
    return <MatchContext.Provider value={matchStore}>
        {children}
    </MatchContext.Provider>
}

export const useMatchStore = () => React.useContext(MatchContext);