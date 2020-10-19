import React , {useState} from 'react';
import {
    Switch,
    Route,
    useParams
} from "react-router-dom";
import ReactCSSTransitionGroup from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import DashboardNewOrder from './Inner/DashboardNewOrder'
import DashboardOrders from './Inner/DashboardOrders'
// import DashboardInventory from '../Supplier/DashboardInventory'
// import DashboardOrders from '../Supplier/DashboardOrders'
// import DashboardProductList from './DashboardProductList'
// import DashboardProductDetail from './DashboardProductDetail'
// import DashboardSearch from './DashboardSearch';
const DashboardContainer = () =>{
    const [title , setTitle] = useState('');
    const changeTitle = (title) => {
        setTitle(title);
    }
    return(
        <div className="flex flex-col w-full md:w-0 flex-1 overflow-hidden md:flex-row">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
                <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                >
                <Route path="/dashboard/orders">
                    <DashboardOrders/>
                </Route>
                <Route path="/dashboard/new-order">
                    <DashboardNewOrder/>
                </Route>
                </AnimatedSwitch>
                {/* <!-- /End replace --> */}
            </main>
        </div>
    )
}

export default DashboardContainer