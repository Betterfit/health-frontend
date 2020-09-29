import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";

import DashboardInventory from './DashboardInventory'
import DashboardOrders from './DashboardOrders'
import DashboardProductList from './DashboardProductList'
import DashboardProductDetail from './DashboardProductDetail'
const DashboardContainer = () =>{
    return(
        <div class="flex flex-col w-0 flex-1 overflow-hidden">
            <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
                <div class="pt-2 pb-6 md:py-6">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
                    </div>
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* <!-- Replace with your content --> */}
                    <div class="py-4">
                        <Switch>
                            <Route path="/dashboard/orders" exact>
                                <DashboardOrders />
                            </Route>
                            <Route path="/dashboard/inventory" exact>
                                <DashboardInventory />
                            </Route>
                            <Route exact path='/dashboard/product/:id' render={(props) => {
                                return ( <DashboardProductList {...props } /> )
                            }} />
                            <Route path='/dashboard/product/:id/detail/:oid' render={(props) => {
                                return ( <DashboardProductDetail {...props } /> )
                            }} />
                        </Switch>
                    </div>
                    {/* <!-- /End replace --> */}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardContainer