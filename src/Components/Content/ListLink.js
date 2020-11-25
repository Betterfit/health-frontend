import React from "react";
import Translator from "Helpers/Translator"
const ListLink = ({
    bulletColor,
    text,
    textStyle,
    selected,
    toggleSelection,
}) => {
    return (
        <button
            onClick={toggleSelection}
            className="flex justify-between w-full "
        >
            <span
                className={`${
                    selected ? "font-bold text-xl" : "font-semibold text-base"
                } p-1 text-base tracking-wide text-betterfit-graphite`}
                style={textStyle}
            >
                <div className="bullet" style={{ background: bulletColor }} />
                {Translator(text)}
            </span>
            {selected && <span className="font-bold text-xl p-1">✖</span>}
        </button>
    );
};

export default ListLink;
