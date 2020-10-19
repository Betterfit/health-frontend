import React, { useState } from "react";
import { useHistory, Route, useRouteMatch } from "react-router-dom";

  
const LogOut = () => {
    const history = useHistory();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push("/login");
    return (
        <div>
        
        </div>
    );
};

export default LogOut;