import React , {useState} from 'react'
import Inventory from '../Components/Inventory/Inventory'

const Dashboard = () => {
    // usestate to save user and pass
    return(
        <div>
            <h1>Im the dashboard page</h1>
            <div className="w-10/12 flex place-self-center justify-self-center m-auto"><Inventory></Inventory></div>

        </div>
    )
}

export default Dashboard