import React from 'react'

function Quantity_Input ({id_tag, name, type}) {
    return (
        <>

        <div class="relative px-5">
        <label for={id_tag} className="uppercase text-betterfit-basic-blue text-xxs tracking-extra-wide pr-3 ">{name}</label>
            <input id={id_tag} type="number" class="py-2 pl-4 pr-2 form-input w-20 text-base border-gray-400 border rounded"/>
        </div>
        </>
    )
};

export default Quantity_Input