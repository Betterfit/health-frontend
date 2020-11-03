import React, { useState, useEffect } from "react";
import Tabs from "Components/Tabs/Tabs";
import OrderSearch from "Components/Search/OrderSearch";
import Table from "Components/Table/Full/Table";
import Api from "Helpers/api";
import dayjs from 'dayjs';
import {useAuthStore} from "Context/authContext";

import PopupButton from "Components/Content/PopUpMenu1"
import PopupText from "Components/Content/PopUpmenu2"
import PopupMenu from "Components/Content/PopUpMenu3"
const api = new Api();



const DashboardOrderList = (props) => {
  const authStore = useAuthStore();
  const userData = JSON.parse(authStore.user);
  const url = props.match.path;
  const userId = userData.user_profile.facility;
  const [orderData, setOrderData] = useState(null);
  const [orderCount, setOrderCountData] = useState(null);
  const [searchActive, setSearchActive] = useState(false);


  const getData = async () =>
    await api
      .getOrderList(userId)
      .then((response) => {
        console.log(response.data);
        setOrderData(cleanOrders(response.data.orders, url));
        setOrderCountData(response.data.summary);

      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getData();
  }, []);


  const FilterOrders = (data, excludeKeys, excludeValues, filterName) => {
    return data
      .filter((order, i) => order.status === filterName)
      .map((filteredOrder) => (
        <Table
          TableData={filteredOrder}
          excludeKeys={excludeKeys}
          excludeValues={excludeValues}
        />
      ));
  };
  
  const callbackDelete = (orderId) => {
    api
      .deleteOrder(orderId)
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  //set Header for title
  const setHeader = (data, url) => {
    let options2 = 
    <PopupMenu>
      <PopupText value="Edit" href={`edit-order/${data.pk}`}></PopupText>
      <PopupText value="Delete" onClick={()=>callbackDelete(data.pk) }></PopupText>
      </PopupMenu>
    let options = [
      {text: "Edit", action:`edit-order/${data.pk}`, type: 'text'},
      {text: "Delete", action:"#", type: 'text'},
      {text: "Submit", action:"#", type: 'button'},
    ];
    return {
      purchase_ord: data.purchase_no,
      ordered_by: data.facility_admin.user.first_name + " " + data.facility_admin.user.last_name,
      ordered_on: dayjs(data.order_date).format("MMM D, YYYY hh:mmA"), 
      order_no: data.order_no,
      status: data.status,
      id:data.pk, 
      url:`${url}/detail/${data.pk}`,
      options: data.status==='draft' ? options : [],
      options2: data.status==='draft' ? options2 : [],
    };
  };
  
  //flatten the orders for easier manipulation with components
  const cleanOrderItems = (data) => {
    let clean = [];
    data.forEach((order, i) => {
      clean.push({
        product_image: order.product_option.product_image,
        item: order.product_option.product_variation,
        size: order.product_option.name,
        quantity: order.quantity,
        priority: order.priority,
        pk: order.product_option.pk,
      });
    });
    return clean;
  };
  
  //flatten the orders for easier manipulation with components
  const cleanOrders = (data, url) => {
    let clean = [];
    data.forEach((order, i) => {
      let header = setHeader(order, url);
      let products = cleanOrderItems(order.order_products);
      header.order_products = products;
      clean.push(header);
    });
  
    return clean;
  };

  const excludeKeys = ["pk", "product_image"];
  const excludeValues = ["pk"];

  const TabData = (() => {
    if (orderData && orderCount) {
      return [
        {
          heading: "All",

          content: orderData.map((order, i) => {
            return (
              <Table
                TableData={order}
                excludeKeys={excludeKeys}
                excludeValues={excludeValues}
              />
            );
          }),
          key: "all",
          amount: Object.values(orderCount).reduce((a, b) => a + b, 0),
        },
        {
          heading: "Draft",
          content: FilterOrders(orderData, excludeKeys, excludeValues, "draft"),
          key: "draft",
          amount: orderCount.draft,
        },
        {
          heading: "Open",
          content: FilterOrders(orderData, excludeKeys, excludeValues, "open"),
          key: "open",
          amount: orderCount.open, 
        },
        {
          heading: "Approved",
          content: FilterOrders(
            orderData,
            excludeKeys,
            excludeValues,
            "approved"
          ),
          key: "approved",
          amount: orderCount.approved, 
        },
        {
          heading: "Delivered",
          content: FilterOrders(
            orderData,
            excludeKeys,
            excludeValues,
            "delivered"
          ),
          key: "delivered",
          amount: orderCount.delivered, 
        },
        {
          heading: "Cancelled",
          content: FilterOrders(
            orderData,
            excludeKeys,
            excludeValues,
            "cancelled"
          ),
          key: "cancelled",
          amount: orderCount.cancelled, 
        },
      ];
    }
  })();
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-10">
      <h2 className="text-3xl text-dark-blue my-3">Orders</h2>
      {TabData && (
        <Tabs
          tabs={TabData}
          amount={true}
          headingComp={
            <OrderSearch
              callBack={(e) => setSearchActive(e)}
              searchActive={searchActive}
            />
          }
        />
      )}
    </div>
  );
};

export default DashboardOrderList;
