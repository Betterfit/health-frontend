import React from 'react'

function Input_Field ({id_tag, name, type}) {
    return (
        <>
        <label for={id_tag} class="sr-only">{name}</label>
        <div class="relative">
            <input id={id_tag} type={type} class="py-3 pl-4 form-input block w-full text-lg border-gray-400 border rounded" placeholder={name}/>
        </div>
        </>
    )
};

export default Input_Field;
