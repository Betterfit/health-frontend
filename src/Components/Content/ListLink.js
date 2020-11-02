import React from 'react';
import {NavLink} from "react-router-dom";
const ListLink = ({bulletColor, text}) => {
    return(
        <div className="font-semibold p-1 text-base tracking-wide">
            <div className="bullet" style={{background:bulletColor}} />
            {text}
        </div>
    )
}

export default ListLink