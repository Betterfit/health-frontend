import React , {useState} from 'react'
// ========= Components ========
import SideBar from 'Components/SideBar/SideBar';
import DashboardContainer from 'Containers/Supplier/DashboardContainer';
import {
    BrowserRouter as Router,
} from "react-router-dom";

// const [isOpen, setIsOpen] = useState(false)


// const sideBarToggle = () => {

// }


const DashboardSupplier = () => {
    // usestate to save user and pass

    const navItemsList = [
        {
            to:'/dashboard/orders',
            name:'Tickets'
        },
        {
            to:'/dashboard/inventory',
            name:'Inventory'
        },
        {
          to:'/dashboard/Resources',
          name:'Resources'
      }
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

export default DashboardSupplier