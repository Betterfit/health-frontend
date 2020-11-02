import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import Tabs from "Components/Tabs/Tabs";
import BoxLink from "Components/Content/BoxLink";
import Search from "Components/Search/Search";
import Table from "Components/Table/Basic/Table";
import Api from "Helpers/api";
import useStores from "Helpers/useStores";
import OrderHeader from "Components/Order/NewOrderHeader";
import Spinner from "Images/spinner.gif";
import OrderCart from "Components/Order/OrderCart";
import DashboardCategoryProductList from "Containers/Facility/Inner/DashboardCategoryProductList";
import DashboardProductDetail from "Containers/Facility/Inner/DashboardProductDetail";
import DashboardCategoryList from "Containers/Facility/Inner/DashboardCategoryList";
import { Switch, Route, useParams } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
// import DashboardProductList from 'Containers/DashboardProductList'
// import DashboardProductDetail from 'Containers/DashboardProductDetail'
import DashboardSearch from "Containers/DashboardSearch";
import { useCartStore } from "Context/cartContext";
import {useAuthStore} from "Context/authContext";
const api = new Api();
const DashboardNewOrder = observer(() => {
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const userData = JSON.parse(authStore.user);
  const [title, setTitle] = useState("New Order");
  const [ProductData, setProductData] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const getData = async () =>
    await api
      .getProductCategories()
      .then((response) => {
        setProductData(response.data);
      })
      .catch((err) => console.log(err));
  let headerData = {
    facility: userData.user_profile.facility_name,
    unit: userData.user_profile.facility_unit ? userData.user_profile.facility_unit : null
  }

  return (
    <>
      <OrderHeader data={headerData} />
      <OrderCart Cart={cartStore.cart} />
    </>
  );
});

export default DashboardNewOrder;
