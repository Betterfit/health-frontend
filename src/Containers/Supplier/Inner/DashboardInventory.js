import React, {useState, useEffect} from 'react';
import Tabs from 'Components/Tabs/Tabs';
import BoxLink from 'Components/Content/BoxLink';
import Search from 'Components/Search/Search';
import Table from 'Components/Table/Basic/Table';
import Api from "Helpers/api";
import Spinner from "Images/spinner.gif";
import {
    Switch,
    Route,
    useParams,
    useLocation
} from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import DashboardSideBar from 'Components/DashboardSideBar/DashboardSideBar';
import DashboardProductList from 'Containers/DashboardProductList'
import DashboardProductDetail from 'Containers/DashboardProductDetail'
import DashboardSearch from 'Containers/DashboardSearch';
import uuid from 'react-uuid'
const api = new Api();
const DashboardInventory = () =>{ 
    const [title , setTitle] = useState('Inventory');
    const [ProductData , setProductData] = useState(null);
    const [searchActive , setSearchActive] = useState(false);
    const location = useLocation();
    const [TabData , setTabData] = useState([]);
    const getData = async () => await api.getProductCategories()
    .then((response) => {
        setTabData([
            {
                heading:'My Inventory',
                content:response.data.map(product => {
                    // console.log(product);
                    return(
                        <div key={uuid()}>
                            <h3 className="mb-4 md:mb-2 font-extrabold text-gray-700 text-xs font-body ml-6 uppercase font-bold tracking-wider">{product.name}</h3>
                            <div className="grid md:grid-cols-1 gap-2 mb-6 md:mb-10">
                                {product.products.map(p =>{
                                    return(
                                    <BoxLink key={uuid()} to="/dashboard/inventory/product/" link={p.name} textColor='dark-blue' id={p.pk}/>
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
                content:response.data.map(product => {
                    // console.log(product);
                    return(
                        <div key={uuid()}>
                            <h3 className="mb-4 md:mb-2 font-extrabold text-gray-700 text-xs font-body ml-6 uppercase font-bold tracking-wider">{product.name}</h3>
                            <div className="grid md:grid-cols-1 gap-2 mb-6 md:mb-10">
                                {product.products.map(p =>{
                                    return(
                                    <BoxLink key={uuid()} to="/dashboard/inventory/product/" link={p.name} textColor='dark-blue' id={p.pk}/>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }),
                key:'all-products'
            }
        ]);
        setProductData(response.data)
    })
    .catch((err) => console.log(err));
    //  setSearchActive(1)  
    useEffect(() => {
        if(!ProductData){
            console.log('get data');
            getData();
        }
    }, []);

    return(
        <>
        { ProductData ? (
            <div className="flex flex-col md:flex-row">
                <DashboardSideBar>
                    <h2 className="text-3xl text-dark-blue my-3">{title}</h2>
                    <Tabs tabs={TabData}  amount={false} headingComp={<Search type="icon" />} />
                </DashboardSideBar>
                <div className={`absolute w-full bg-gray-100 lg:relative lg:w-3/5 mx-auto h-screen overflow-y-scroll ${location.pathname === "/dashboard/inventory" ? `z-0`: `z-10`}`}>
                    <Route exact path='/dashboard/inventory/product/:id' exact render={(props) => {
                        return ( <DashboardProductList {...props } /> )
                    }} />
                    <Route path='/dashboard/inventory/product/:id/detail/:oid?/edit' exact render={(props) => {
                        return ( <DashboardProductDetail edit={true} {...props } /> )
                    }} />
                    <Route path='/dashboard/inventory/search:query?'>
                        <DashboardSearch />
                    </Route>
                </div>
            </div>
        )
        : (
            <div className="relative w-full min-h-screen"> 
                <img className="absolute left-0 right-0 spinner" style={{maxWidth:150}} src={Spinner} />
            </div> 
        )}
        </>


    
    )
 
    
}

export default DashboardInventory