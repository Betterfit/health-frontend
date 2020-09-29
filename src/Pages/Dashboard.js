import React , {useState} from 'react'
// ========= Components ========
import SideBarDashBoard from 'Components/SideBar/SideBar';
import DashboardContainer from 'Containers/DashboardContainer';
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
            <Router>
                <SideBarDashBoard />
                <DashboardContainer />
            </Router>
        </div>
    )
}

export default Dashboard