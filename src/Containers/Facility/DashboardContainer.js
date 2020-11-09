import React , {useState} from 'react';
import {
    Switch,
    Route,
    Redirect,
    useParams
} from "react-router-dom";
import ReactCSSTransitionGroup from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import DashboardNewOrder from './Inner/DashboardNewOrder'
import DashboardOrders from './Inner/DashboardOrders'
import DashboardFacilityOrder from './Inner/DashboardFacilityOrderDetail';
import DashboardResources from '../DashboardResources'
import DashboardResearch from '../DashboardResearch'
// import DashboardInventory from '../Supplier/DashboardInventory'
// import DashboardOrders from '../Supplier/DashboardOrders'
// import DashboardProductList from './DashboardProductList'
// import DashboardProductDetail from './DashboardProductDetail'
// import DashboardSearch from './DashboardSearch';
import {CartProvider} from "Context/cartContext";
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
                    <Redirect to="/dashboard/new-order/category/"/>
                )}/>
                <Route path="/dashboard/orders" exact>
                    <DashboardOrders/>
                </Route>
                <Route exact path="/dashboard/orders/detail/:id" render={(props) => {
                        return ( <DashboardFacilityOrder {...props } /> )
                }} />
                <Route path="/dashboard/new-order/category">
                    <CartProvider>
                        <DashboardNewOrder/>
                    </CartProvider>
                </Route>
                <Route path="/dashboard/resources" >
                    <DashboardResources initial changeTitle={(title) => changeTitle(title)} />
                </Route>
                <Route path="/dashboard/research" >
                    <DashboardResearch initial changeTitle={(title) => changeTitle(title)} />
                </Route>

                </AnimatedSwitch>
                {/* <!-- /End replace --> */}
            </main>
        </div>
    )
}

export default DashboardContainer