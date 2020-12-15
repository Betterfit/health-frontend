import OrderHeader from "Components/Order/NewOrderHeader";
import OrderCart from "Components/Order/OrderCart";
import { useAuthStore } from "Context/authContext";
import { useCartStore } from "Context/cartContext";
import Api from "Helpers/api";
import { observer } from "mobx-react";
import React from "react";

const api = new Api();
const DashboardNewOrder = observer(() => {
  const cartStore = useCartStore();
  const authStore = useAuthStore();
  const userData = JSON.parse(authStore.user);

  let headerData = {
    facility: userData.user_profile.facility_name,
    unit: userData.user_profile.facility_unit
      ? userData.user_profile.facility_unit
      : null,
  };

  return (
    <>
      <OrderHeader data={headerData} />
      <OrderCart Cart={cartStore.cart} />
    </>
  );
});

export default DashboardNewOrder;
