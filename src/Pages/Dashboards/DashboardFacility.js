import React , {useState} from 'react'
// ========= Components ========
import SideBar from 'Components/SideBar/SideBar';
import DashboardContainer from 'Containers/Facility/DashboardContainer';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import Order from "Images/Icons/order.svg";
import Resources from "Images/Icons/resources.svg";
import NewOrder from "Images/Icons/new-order.svg";

// const [isOpen, setIsOpen] = useState(false)


// const sideBarToggle = () => {

// }

const DashboardFacility = () => {
    // usestate to save user and pass
    const navItemsList = [
        {
            to:'/dashboard/new-order/category/',
            name:'New Order',
            icon: NewOrder,
            key:'new-order',
        },
        {
            to:'/dashboard/orders',
            name:'Orders',
            icon:Order,
            key:'order',
        },
        {
            to:'/dashboard/resources',
            name:'Resources',
            icon: Resources,
            key:'resources',
        },
        {
            to: '/dashboard/research',
            name: 'Research',
            // placeholder
            icon: Resources,
            key: 'research'
        }
    ]
    return(
        <div className="md:h-screen flex-col md:flex-row flex overflow-hidden bg-white min-h-screen">
            <Router>
                <SideBar navItemsList={navItemsList} />
                <DashboardContainer />
            </Router>
        </div>
    )
}

export default DashboardFacility