import React , {useState} from 'react';
import {
    Switch,
    Route,
    useParams,
    Redirect
} from "react-router-dom";
import ReactCSSTransitionGroup from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import DashboardInventory from './Inner/DashboardInventory'
import DashboardTickets from './Inner/DashboardTickets'
import DashboardTicketDetail from './Inner/DashboardTicketDetail';
import DashboardResources from '../DashboardResources'

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
                        <Redirect to="/dashboard/inventory"/>
                    )}/>
                    <Route exact path="/dashboard/ticket/:id" render={(props) => {
                        return ( <DashboardTicketDetail {...props } /> )
                    }} />
                    <Route path="/dashboard/tickets/">
                        <DashboardTickets />
                    </Route>
                    <Route path="/dashboard/inventory" >
                        <DashboardInventory />
                    </Route>
                    <Route path="/dashboard/resources" >
                        <DashboardResources />
                    </Route>
                </AnimatedSwitch>
        
                {/* <!-- /End replace --> */}
            </main>
        </div>
    )
}

export default DashboardContainer