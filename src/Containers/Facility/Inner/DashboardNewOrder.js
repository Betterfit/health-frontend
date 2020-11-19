import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import Api from "Helpers/api";
import OrderHeader from "Components/Order/NewOrderHeader";
import OrderCart from "Components/Order/OrderCart";
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
