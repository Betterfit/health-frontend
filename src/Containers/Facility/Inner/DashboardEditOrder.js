import React, {useState, useEffect} from 'react';
import { observer } from "mobx-react";
import Api from "Helpers/api";
import { useHistory } from 'react-router-dom'
import OrderHeader from "Components/Order/NewOrderHeader"
import OrderCart from "Components/Order/OrderCart"
import DashboardCategoryProductList from "Containers/Facility/Inner/DashboardCategoryProductList"
import DashboardProductDetail from "Containers/Facility/Inner/DashboardProductDetail"
import DashboardCategoryList from "Containers/Facility/Inner/DashboardCategoryList"
import {
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import DashboardSideBar from 'Components/DashboardSideBar/DashboardSideBar';
// import DashboardProductList from 'Containers/DashboardProductList'
// import DashboardProductDetail from 'Containers/DashboardProductDetail'
import DashboardSearch from 'Containers/DashboardSearch';
import {useCartStore} from "Context/cartContext";
import dayjs from "dayjs";


const api = new Api();
const DashboardEditOrder = observer((props) =>{ 
    const history = useHistory();
    const { match } = props;
    const orderId = parseInt(match.params.id);
    console.log("INSIDE", props, orderId)
    const cartStore = useCartStore();

    const [order, setOrderData] = useState(null);
    const [orderHeader, setOrderHeader] = useState();

    const getOrder = async () => await api.getOrder(orderId)
    .then((response) => {
        let arr = response.data.order_products;
        arr = arr.map(item => {
            let obj = {
                pk: item.product_option.pk,
                quantity: item.quantity, 
            };
            return obj;
        });

        setOrderData(response.data);
        console.log("RESPONCE")
        setOrderHeader({
            order_number: response.data.order_no,
            order_date: dayjs(response.data.order_date).format("MMM DD, YYYY"),
            facility: response.data.facility.name,
            unit: "Emergency",
          });
          cartStore.getLocalCartStorage();
          cartStore.clearCart();
          cartStore.importCart(arr);
          console.log("ORDER INOF", order);
    })
    .catch((err) => console.log(err));
    useEffect(() => {
        getOrder();

    }, []);



    return(
        <div className="flex flex-col md:flex-row">
            <DashboardSideBar addonStyles=" flex flex-col">
                    <OrderHeader data={orderHeader} />
                    <OrderCart Cart={cartStore.cart}/>
            </DashboardSideBar>
            <div className="w-full md:w-3/5 mx-auto h-screen md:overflow-y-scroll">
                <Route exact path='/dashboard/new-order/category/' exact render={(props) => {
                    return ( <DashboardCategoryList {...props } /> )
                }} />
                <Route path='/dashboard/new-order/category/:categoryName/:id?' exact render={(props) => {
                    return ( <DashboardCategoryProductList edit={true} {...props } /> )
                }} />
                 {
                <Route path='/dashboard/new-order/category/:categoryName/:cid/product/:pid/:id?' exact render={(props) => {
                    return ( <DashboardProductDetail edit={true} {...props } /> )
                }} />/*
                <Route path='/dashboard/inventory/search:query?'>
                    <DashboardSearch />
                </Route> */}
            </div>
        </div>
        
    ) 

})

export default DashboardEditOrder