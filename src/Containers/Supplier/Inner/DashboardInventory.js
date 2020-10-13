import React, {useState} from 'react';
import Tabs from 'Components/Tabs/Tabs';
import BoxLink from 'Components/Content/BoxLink';
import Search from 'Components/Search/Search';
import Table from 'Components/Table/Table';
import Api from "Helpers/api";
import Spinner from "Images/spinner.gif";

import {
    Switch,
    Route,
    useParams
} from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import DashboardSideBar from 'Components/DashboardSideBar/DashboardSideBar';
import DashboardProductList from 'Containers/DashboardProductList'
import DashboardProductDetail from 'Containers/DashboardProductDetail'
import DashboardSearch from 'Containers/DashboardSearch';

const api = new Api();
const DashboardInventory = () =>{ 
    const [title , setTitle] = useState('Inventory');
    const [ProductData , setProductData] = useState(null);
    const [searchActive , setSearchActive] = useState(false)
    
    const getData = async () => await api.getProductCategories()
    .then((response) => {
        setProductData(response.data)
    })
    .catch((err) => console.log(err));
    //  setSearchActive(1)  
    if(ProductData){
        // console.log(ProductData);
        const TabData = [ 
            {
                heading:'My Inventory',
                content:ProductData.map(product => {
                    // console.log(product);
                    return(
                        <div>
                            <h3 className="mb-4 md:mb-2 font-extrabold text-gray-700 text-xs font-body ml-6 uppercase font-bold tracking-wider">{product.name}</h3>
                            <div className="grid md:grid-cols-1 gap-2 mb-6 md:mb-10">
                                {product.products.map(p =>{
                                    return(
                                    <BoxLink key={`${p.name}`} to="/dashboard/inventory/product/" link={p.name} textColor='dark-blue' id={p.pk}/>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }),
                key:'my-inventory'
            },
            {
                heading:'All Products',
                content: 'All Products!!',
                key:'all-products'
            }
        ]
        return(
            <div className="flex flex-col md:flex-row">
                <DashboardSideBar>
                    <h2 className="text-3xl text-dark-blue my-3">{title}</h2>
                    <Tabs tabs={TabData} headingComp={<Search type="icon" callBack={(e) => setSearchActive(e)} searchActive={searchActive} />} />
                </DashboardSideBar>
                <div className="w-3/5 mx-auto h-screen overflow-y-scroll">
                    <Route exact path='/dashboard/inventory/product/:id' exact render={(props) => {
                        return ( <DashboardProductList {...props } /> )
                    }} />
                    <Route path='/dashboard/inventory/product/:id/detail/:oid?' exact render={(props) => {
                        return ( <DashboardProductDetail edit={true} {...props } /> )
                    }} />
                    <Route path='/dashboard/inventory/search:query?'>
                        <DashboardSearch />
                    </Route>
                </div>
            </div>
            
        )
    }else{
        getData();
        return(
            <div className="relative w-full min-h-screen"> 
                <img className="absolute left-0 right-0 spinner" style={{maxWidth:150}} src={Spinner} />
            </div> 
        )
    }
        

}

export default DashboardInventory