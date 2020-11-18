import React, {useState} from 'react';
import Tabs from 'Components/Tabs/Tabs';
import BoxLink from 'Components/Content/BoxLink';
import Search from 'Components/Search/Search';
import Translator from "Helpers/Translator";
import Api from "Helpers/api";
import Spinner from "Images/spinner.gif";
import {
    Switch,
    Route,
    useParams,
    useLocation
} from "react-router-dom";
import DashboardSideBar from 'Components/DashboardSideBar/DashboardSideBar';
import DashboardProductList from 'Containers/DashboardProductList'
import DashboardProductDetail from 'Containers/DashboardProductDetail'
import DashboardSearch from 'Containers/DashboardSearch';
import {useAuthStore} from "Context/authContext";

const api = new Api();
const DashboardInventory = () =>{ 
    const [title , setTitle] = useState('Inventory');
    const [AllCategoryData , setAllCategoryData] = useState(null);
    const [SupplierCategoryData , setSupplierCategoryData] = useState(null);
    const [searchActive , setSearchActive] = useState(false);
    const location = useLocation();
    const authStore = useAuthStore();
    const userData = JSON.parse(authStore.user);
    const supplierId = userData.user_profile.supplier;

    const getData = () => {
        getAllCategories();
        getSupplierCategories();
    }

    const getAllCategories = async () => await api.getProductCategories()
    .then((response) => {
        console.log(response.data)
        setAllCategoryData(response.data)
    })
    .catch((err) => console.log(err));

    const getSupplierCategories = async () => await api.getProductsBySupplier(supplierId)
    .then((response) => {
        setSupplierCategoryData(response.data)
    })
    .catch((err) => console.log(err));
    //  setSearchActive(1)  
    if(AllCategoryData && SupplierCategoryData){
        // console.log(ProductData);
        const TabData = [ 
            {
                heading:'My Inventory',
                content:SupplierCategoryData.map(product => {
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
                content:AllCategoryData.filter((category) => category.products.length >0)
                .map(product => {
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
                key:'all-products'
            }
        ]
        return(
            <div className="flex flex-col md:flex-row">
                <DashboardSideBar>
                    <h2 className="text-3xl text-dark-blue my-3">{Translator(title)}</h2>
                    <Tabs tabs={TabData} headingComp={<Search type="icon" amount={false} callBack={(e) => setSearchActive(e)} searchActive={searchActive} />} />
                </DashboardSideBar>
                <div className={`absolute w-full bg-white lg:relative lg:w-3/5 mx-auto h-screen overflow-y-scroll ${location.pathname === "/dashboard/inventory" ? `z-0`: `z-10`}`}>
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