import React , {useState} from 'react'
// ========= Components ========
import SideBar from 'Components/SideBar/SideBar';
import DashboardContainer from 'Containers/Supplier/DashboardContainer';
import {
    BrowserRouter as Router,
} from "react-router-dom";
import Ticket from "Images/Icons/ticket.svg";
import Resources from "Images/Icons/resources.svg";
import Inventory from "Images/Icons/inventory.svg";
import Translator from "Helpers/Translator";
const DashboardSupplier = () => {
    // usestate to save user and pass

    const navItemsList = [
        {
            to:'/dashboard/tickets',
            name:Translator('tickets'),
            icon: Ticket,
            key:'tickets',
        },
        {
            to:'/dashboard/inventory',
            name:'Inventory',
            icon: Inventory,
            key:'inventory',
        },
        {
          to:'/dashboard/Resources',
          name:'Resources',
          icon: Resources,
          key:'resources',
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

export default DashboardSupplier