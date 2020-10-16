import React, {useState} from 'react';
import Tabs from 'Components/Tabs/Tabs';
import BoxLink from 'Components/Content/BoxLink';
import Search from 'Components/Search/Search';
import Table from 'Components/Table/Basic/Table';
import Api from "Helpers/api";
import OrderHeader from "Components/Order/NewOrderHeader"
import Spinner from "Images/spinner.gif";
import OrderCart from "Components/Order/OrderCart"
import DashboardCategoryProductList from "Containers/Facility/Inner/DashboardCategoryProductList"

import {
    Switch,
    Route,
    useParams
} from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import DashboardSideBar from 'Components/DashboardSideBar/DashboardSideBar';
// import DashboardProductList from 'Containers/DashboardProductList'
// import DashboardProductDetail from 'Containers/DashboardProductDetail'
import DashboardSearch from 'Containers/DashboardSearch';

const api = new Api();
const DashboardNewOrder = () =>{ 
    const [title , setTitle] = useState('New Order');
    const [ProductData , setProductData] = useState(null);
    const [searchActive , setSearchActive] = useState(false)
    
    const getData = async () => await api.getProductCategories()
    .then((response) => {
        setProductData(response.data)
    })
    .catch((err) => console.log(err));
     
    return(
        <div className="flex flex-col md:flex-row">
            <DashboardSideBar addonStyles=" flex flex-col">
                    <OrderHeader/>
                    <OrderCart/>
            </DashboardSideBar>
            <div className="w-3/5 mx-auto h-screen overflow-y-scroll">
                <DashboardCategoryProductList/>
                {/* <Route exact path='/dashboard/order/product/:id' exact render={(props) => {
                    return ( <DashboardProductList {...props } /> )
                }} />
                <Route path='/dashboard/inventory/product/:id/detail/:oid?' exact render={(props) => {
                    return ( <DashboardProductDetail edit={true} {...props } /> )
                }} />
                <Route path='/dashboard/inventory/search:query?'>
                    <DashboardSearch />
                </Route> */}
            </div>
        </div>
        
    ) 

}

export default DashboardNewOrder