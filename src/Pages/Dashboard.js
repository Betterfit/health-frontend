import React , {useState} from 'react'
import { Transition } from '@tailwindui/react'
// ========= Components ========
import SideBar from 'Components/SideBar/SideBar';
import DashboardContainer from 'Containers/DashboardContainer';
import SideBarMobileToggle from 'Components/SideBar/SideBarMobileToggle';
import {
    BrowserRouter as Router,
} from "react-router-dom";

// const [isOpen, setIsOpen] = useState(false)


// const sideBarToggle = () => {

// }

const Dashboard = () => {
    // usestate to save user and pass
    return(
        <div class="md:h-screen flex-col md:flex-row flex overflow-hidden bg-white" style={{backgroundColor:'#F7FAFC'}}>
           <h1> sdgsdgsdfg</h1>
            {/* <Router>
                <SideBar />
                <DashboardContainer />
            </Router> */}
        </div>
    )
}

export default Dashboard