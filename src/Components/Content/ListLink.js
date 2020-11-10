import React from "react";
import { NavLink } from "react-router-dom";
const ListLink = ({ bulletColor, text, textStyle }) => {
    return (
        <div
            className="font-semibold p-1 text-base tracking-wide"
            style={textStyle}
        >
            <div className="bullet" style={{ background: bulletColor }} />
            {text}
        </div>
    );
};

export default ListLink;
