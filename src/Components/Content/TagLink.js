import React from "react";
const TagLink = ({ tag }) => {
    const tagList = {
        1: ["#E3EFFC", "#244499", "Masks"],
        2: ["#DBF4F5", "#235340", "Gowns"],
        3: ["#EDEBFC", "#4D2DAE", "Sanitizers"],
        4: ["#FBEDDE", "#803419", "COVID-19 Pandemic Response"],
        5: ["#F9E8F2", "#8C264B", "Influence of COVID-19"],
        6: ["#E5ECFD", "#3E3C97", "Reusable Respirators"],
        7: ["#FDF5BA", "#6B3D1E", "Safety Test Kits"],
        8: ["#5456E3", "#FFFFFF", "IV Solution"],
        9: ["#ED6537", "#FFFFFF", "Vaccine"],
    };
    return (
        <div className="my-2 mx-1">
            <div
                className="resource-tag font-black text-gray-700 font-body uppercase tracking-widest"
                //     style={{
                //         background: tag
                //         color: tagList[tagType][1],
                //     }}
            >
                {tag?.title}
            </div>
        </div>
    );
};

export default TagLink;
