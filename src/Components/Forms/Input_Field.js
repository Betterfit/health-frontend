import React from 'react'

function Input_Field ({id_tag, name, type}) {
    return (
        <>
        <label htmlFor={id_tag} className="sr-only">{name}</label>
        <div className="relative">
            <input id={id_tag} type={type} className="py-3 pl-4 form-input block w-full text-lg border-gray-400 border rounded" placeholder={name}/>
        </div>
        </>
    )
};

export default Input_Field;
