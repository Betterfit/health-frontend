import React , {useState} from 'react';
import {
    Switch,
    Route,
    useParams,
    Redirect
} from "react-router-dom";
import ReactCSSTransitionGroup from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';

import DashboardMatches from "./Inner/DashboardMatches";
import DashboardMatchesDetail from "./Inner/DashboardMatchesDetail";
import DashboardMatchesOrderDetail from "./Inner/DashboardMatchesOrderDetail";
import DashboardTrafficDashboard from "./Inner/DashboardTrafficDashboard";
import DashboardInventory from 'Containers/Supplier/Inner/DashboardInventory'
import DashboardResources from '../DashboardResources'
// import DashboardInventory from './Inner/DashboardInventory'
// import DashboardTickets from './Inner/DashboardTickets'
// import DashboardTicketDetail from './Inner/DashboardTicketDetail';

const DashboardContainer = () =>{
    const [title , setTitle] = useState('');
    const changeTitle = (title) => {
        setTitle(title);
    }
    return(
        <div className="flex flex-col w-full md:w-0 flex-1 overflow-hidden md:flex-row">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex="0">
                <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                >
                    <Route exact path="/dashboard" render={() => (
                        <Redirect to="/dashboard/matches"/>
                    )}/>
                    <Route path="/dashboard/matches" exact>
                        <DashboardMatches />
                    </Route>
                    <Route exact path="/dashboard/matches/:id" render={(props) => {
                        return ( <DashboardMatchesDetail {...props } /> )
                    }} /> 
                     <Route exact path="/dashboard/matches/:id/:oid" render={(props) => {
                        return ( <DashboardMatchesOrderDetail {...props } /> )
                    }} /> 
                    <Route path="/dashboard/traffic-dashboard">
                        <DashboardTrafficDashboard />
                    </Route>
                    <Route path="/dashboard/inventory" >
                        <DashboardInventory initial changeTitle={(title) => changeTitle(title)} />
                    </Route>
                    <Route path="/dashboard/resources" >
                        <DashboardResources initial changeTitle={(title) => changeTitle(title)} />
                    </Route>
               </AnimatedSwitch> 
            </main>
        </div>
    )
}

export default DashboardContainer