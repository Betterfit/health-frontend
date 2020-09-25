import React , {useState} from 'react'
import Inventory from '../Components/Inventory/Inventory'

let dummydata = { 
    "product_name": "NaCl 0.9% Minibag pk/4",
    "product_size": "100ml",
    "product_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras iaculis scelerisque enim, et venenatis arcu dictum nec. Praesent tristique lacinia nisi, pulvinar congue dui malesuada vitae.",
    "product_alloted": 244,
    "product_available": 430,
}
const Dashboard = () => {
    // usestate to save user and pass
    return(
        <div>
            <h1>Im the dashboard page</h1>
            <div className="w-10/12 flex place-self-center justify-self-center m-auto"><Inventory product={dummydata}></Inventory></div>

        </div>
    )
}

export default Dashboard