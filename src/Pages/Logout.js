import React, { useState } from "react";
import { useHistory, Route, useRouteMatch } from "react-router-dom";
import {useAuthStore} from "Context/authContext";
  
const LogOut = () => {
    const authStore = useAuthStore();
    const history = useHistory();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    authStore.token = null;
    authStore.user = null;
    history.push("/login");
    return (
        <div>
        
        </div>
    );
};

export default LogOut;
