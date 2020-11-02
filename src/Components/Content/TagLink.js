import React from 'react';
import {NavLink} from "react-router-dom";
const TagLink = ({tagType}) => {
    const tagList = {
        'Masks': ['#E3EFFC', '#244499'],
        'Gowns': ['#DBF4F5', '#235340'],
        'Sanitizers': ['#EDEBFC', '#4D2DAE'],
        'Wipes': ['#FBEDDE', '#803419'],
        'Filters': ['#F9E8F2', '#8C264B'],
        'Reusable Respirators': ['#E5ECFD', '#3E3C97'],
        'Safety Test Kits': ['#FDF5BA', '#6B3D1E'],
        'IV Solution': ['#5456E3', '#FFFFFF'],
        'Vaccine': ['#ED6537', '#FFFFFF'],
    }
    return(
        <div className="my-2 mx-1">
            <div className="resource-tag font-black text-gray-700 font-body uppercase tracking-widest"
                style={{background:tagList[tagType][0], color:tagList[tagType][1]}}>
                {tagType}
            </div>
        </div>
    )
}

export default TagLink