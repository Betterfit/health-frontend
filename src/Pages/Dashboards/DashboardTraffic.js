import React , {useState} from 'react'
// ========= Components ========
import SideBar from 'Components/SideBar/SideBar';
import DashboardContainer from 'Containers/Traffic/DashboardContainer';
import {
    BrowserRouter as Router,
} from "react-router-dom";

import Order from "Images/Icons/order.svg";
import Resources from "Images/Icons/resources.svg";
import NewOrder from "Images/Icons/new-order.svg";
import Dashboard from "Images/Icons/dashboard.svg";
import Matches from "Images/Icons/matches.svg";
import Inventory from "Images/Icons/inventory.svg";


// const [isOpen, setIsOpen] = useState(false)


// const sideBarToggle = () => {

// }

const DashboardTraffic = () => {
    // usestate to save user and pass
    const navItemsList = [
        {
            to:'/dashboard/traffic-dashboard',
            name:'Dashboard',
            icon: Dashboard,
        },
        {
            to:'/dashboard/matches',
            name:'Matches',
            icon:Matches,
        },
        {
            to:'/dashboard/orders',
            name:'Orders',
            icon: Order,
        },
        {
            to:'/dashboard/inventory',
            name:'Inventory',
            icon: Inventory,
        },
        {
            to:'/dashboard/resources',
            name:'Resources',
            icon: Resources,
        },     
    ]
    return(
        <div className="md:h-screen flex-col md:flex-row flex overflow-hidden bg-white min-h-screen" style={{backgroundColor:'#F7FAFC'}}>
            <Router>
                <SideBar navItemsList={navItemsList} />
                <DashboardContainer />
            </Router>
        </div>
    )
}

export default DashboardTraffic