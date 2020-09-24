import React from 'react'
import Inventory from './Inventory'


function Inventory_Description_Only(props) {
    const description = props.description;
    return <dd className="text-gray-700 text-lg leading-6 pb-3">{description}</dd>
}

function Inventory_Edit(props){
    const description = props.description;
    return <input type="number" className="py-3 pl-4 form-input block w-3/4 text-lg border-gray-400 border rounded" defaultValue={description}/>
}

function Inventory_Description ({title, description, class_addons, edit}) {
    let description_type;
    let standard_dt_styles = `uppercase text-sm text-gray-600 font-bold tracking-wider pt-6 ${class_addons}`;
    console.log({standard_dt_styles})
    if (edit){
        description_type = <Inventory_Edit description={description}/>
    }
    else {
        description_type =  <Inventory_Description_Only description={description}/>
    }

    return (                  
    <>
    <dt className={standard_dt_styles}>{title}</dt>
    {description_type}
    </>
    )

    }; 

export default Inventory_Description