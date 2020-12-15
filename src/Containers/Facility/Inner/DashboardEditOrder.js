import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import Api from "Helpers/api";
import { useHistory } from "react-router-dom";
import OrderHeader from "Components/Order/NewOrderHeader";
import OrderCart from "Components/Order/OrderCart";
import { useCartStore } from "Context/cartContext";
import dayjs from "dayjs";

const api = new Api();
const DashboardEditOrder = observer((props) => {
  const history = useHistory();
  const { match } = props;
  const orderId = parseInt(match.params.oid);

  const cartStore = useCartStore();

  const [order, setOrderData] = useState(null);
  const [orderHeader, setOrderHeader] = useState();

  const getOrder = async () =>
    await api
      .getOrder(orderId)
      .then((response) => {
        let arr = response.data.order_products;
        arr = arr.map((item) => {
          let obj = {
            pk: item.product_option.pk,
            product_pk: item.pk,
            quantity: item.quantity,
            priority: item.priority == "stat" ? true : false,
          };
          return obj;
        });

        setOrderData(response.data);
        setOrderHeader({
          order_number: response.data.order_no,
          order_date: dayjs(response.data.order_date).format("MMM DD, YYYY"),
          purchase_order: response.data.purchase_no,
          facility: response.data.facility.name,
        });
        cartStore.getLocalCartStorage();
        cartStore.clearCart();
        cartStore.newOrderName = response.data.purchase_no;
        cartStore.importCart(arr);
      })
      .catch((err) => console.log(err));
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      {orderHeader && (
        <>
          <OrderHeader data={orderHeader} />
          <OrderCart
            Cart={cartStore.cart}
            OrderID={orderHeader.purchase_order}
            id={orderId}
          />
        </>
      )}
    </>
  );
});

export default DashboardEditOrder;
