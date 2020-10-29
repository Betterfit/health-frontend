import React , {useState} from 'react';
import dayjs from "dayjs";
import {
    Switch,
    Route,
    Redirect,
    useParams
} from "react-router-dom";
import ReactCSSTransitionGroup from 'react-transition-group';
import { AnimatedSwitch } from 'react-router-transition';
import DashboardNewOrder from './Inner/DashboardNewOrder'
import DashboardOrderList from './Inner/DashboardOrderList'
import DashboardOrder from './Inner/DashboardOrder'
import DashboardFacilityOrder from './Inner/DashboardFacilityOrderDetail';
// import DashboardInventory from '../Supplier/DashboardInventory'
// import DashboardOrders from '../Supplier/DashboardOrders'
// import DashboardProductList from './DashboardProductList'
// import DashboardProductDetail from './DashboardProductDetail'
// import DashboardSearch from './DashboardSearch';
import {CartProvider} from "Context/cartContext";
import { EditCartProvider } from 'Context/editCartContext';
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
                <Route path="/dashboard/orders" exact render={(props) =>{
                    return ( <DashboardOrderList {...props} /> )
                }} />
                <Route path="/dashboard/edit-order/:oid" exact render={(props) => {
                    let id = props.match.params.oid;
                    return (
                    <Redirect to={`/dashboard/edit-order/${id}/category/`}/>
                )}}/>
                <Route path="/dashboard/edit-order/:oid/category" render={(props) => {
                    return ( 
                        <editCartProvider>
                        <DashboardOrder props={props} type='edit'/>
                        </editCartProvider>
                    )
                }} />
                <Route exact path="/dashboard/orders/detail/:id" render={(props) => {
                        return ( <DashboardFacilityOrder {...props } /> )
                }} />
                <Route path="/dashboard/new-order/category" render={(props) => {
                        return ( 
                            <CartProvider>
                            <DashboardOrder props={props}   type='new' />
                            </CartProvider>
                )}} />
                </AnimatedSwitch>
                {/* <!-- /End replace --> */}
            </main>
        </div>
    )
}

export default DashboardContainer