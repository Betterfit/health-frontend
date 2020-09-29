import React , {useState} from 'react';
import {
    Switch,
    Route,
    useParams
} from "react-router-dom";

import DashboardInventory from './DashboardInventory'
import DashboardOrders from './DashboardOrders'
import DashboardProductList from './DashboardProductList'
import DashboardProductDetail from './DashboardProductDetail'
const DashboardContainer = () =>{
    const [title , setTitle] = useState('');
    const changeTitle = (title) => {
        setTitle(title);
    }
    return(
        <div class="flex flex-col w-full md:w-0 flex-1 overflow-hidden">
            <div class="w-full bg-white border-b border-gray-400 mb-8 px-6 py-4 sm:px-6 md:px-8">
                <h1 class="text-2xl font-semibold text-gray-700">
                    {title}
                </h1>
            </div>
            <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
                <div class="pt-2 pb-6 md:py-6">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    {/* <!-- Replace with your content --> */}
                    <div class="py-4">
                        <Switch>
                            <Route path="/dashboard/orders" exact>
                                <DashboardOrders changeTitle={(title) => changeTitle(title)} />
                            </Route>
                            <Route path="/dashboard/inventory" exact>
                                <DashboardInventory changeTitle={(title) => changeTitle(title)} />
                            </Route>
                            <Route exact path='/dashboard/product/:id' render={(props) => {

                            return ( <DashboardProductList changeTitle={(title) => changeTitle(title)} {...props } /> )
                            }} />
                            <Route path='/dashboard/product/:id/detail/:oid?' exact render={(props) => {
                                return ( <DashboardProductDetail edit={true} changeTitle={(title) => changeTitle(title)} {...props } /> )
                            }} />
                            <Route path='/dashboard/product/:id/detail/:oid?/edit' exact render={(props) => {
                                return ( <DashboardProductDetail edit={true} changeTitle={(title) => changeTitle(title)} {...props } /> )
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