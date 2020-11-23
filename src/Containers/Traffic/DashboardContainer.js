import React , {useState} from 'react';
import {
    Switch,
    Route,
    useParams,
    Redirect,
    useHistory
} from "react-router-dom";
import ReactCSSTransitionGroup from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';

import DashboardMatchesListing from "./Inner/DashboardMatchesListing";
import DashboardMatches from "./Inner/DashboardMatches";
import DashboardMatchesHistory from "./Inner/DashboardMatchesHistory";
import DashboardMatchesOrderDetail from "./Inner/DashboardMatchesOrderDetail";
import DashboardTrafficDashboard from "./Inner/DashboardTrafficDashboard";
import DashboardTrafficInventory from './Inner/DashboardTrafficInventory';
import DashboardResources from '../DashboardResources';
import NotFound from 'Pages/404';
// import DashboardInventory from './Inner/DashboardInventory'
// import DashboardTickets from './Inner/DashboardTickets'
// import DashboardTicketDetail from './Inner/DashboardTicketDetail';
import {MatchProvider} from "Context/matchContext";

const DashboardContainer = () =>{
    const history = useHistory();
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
                        <Redirect to="/dashboard/match-listing"/>
                    )}/>
                    <Route path="/dashboard/match-listing" exact>
                        <DashboardMatchesListing />
                    </Route>
                    <Route exact path="/dashboard/matches">
                        <MatchProvider>
                            <DashboardMatches/> 
                        </MatchProvider>
                    </Route>
                    <Route exact path="/dashboard/matches/history:query?" render={(props) => {
                        return ( <DashboardMatchesHistory {...props } /> )
                    }} /> 
                     <Route exact path="/dashboard/matches/:id/" render={(props) => {
                        return ( <DashboardMatchesOrderDetail {...props } /> )
                    }} /> 
                    <Route path="/dashboard/traffic-dashboard">
                        <DashboardTrafficDashboard />
                    </Route>
                    <Route path="/dashboard/inventory" >
                        <DashboardTrafficInventory initial changeTitle={(title) => changeTitle(title)} />
                    </Route>
                    <Route path="/dashboard/resources" >
                        <DashboardResources initial changeTitle={(title) => changeTitle(title)} />
                    </Route>
                    {/* <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                     */}
               </AnimatedSwitch> 
            </main>
        </div>
    )
}

export default DashboardContainer