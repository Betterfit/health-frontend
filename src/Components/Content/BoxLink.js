import React from 'react';
import {NavLink} from "react-router-dom";
import { ReactSVG } from 'react-svg';
import RightLongArrow from 'Images/Icons/right-long-arrow.svg';
const BoxLink = ({textColor, link, to, id}) => {
    return(
        <NavLink to={`${to}${id}`} 
          className={`text-${textColor} px-4 py-5 flex justify-between bg-white rounded-md box-link font-bold`}
        >
            {link}
            <ReactSVG src={RightLongArrow} className="flex items-center"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;margin-left:15px;')}}  />
        </NavLink>
    )
}

export default BoxLink