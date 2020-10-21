import React, { useState, useEffect } from "react";
import Tabs from "Components/Tabs/Tabs";
import OrderSearch from "Components/Search/OrderSearch";
import Table from "Components/Table/Full/Table";
import Api from "Helpers/api";
import useStores from "Helpers/useStores";
// import OrderHeader from 'Components/Order/OrderHeader'
// import BackNavigation from 'Components/Helpers/BackNavigation'

import FacilityOrderTabs from "Data/FacilityOrderTabs";
import OrderProducts from "Data/OrderProducts";

const api = new Api();

const Content = (data, HeaderData, excludeKeys, excludeValues, filterName) => {
  return data
    .filter((order, i) => order[0].status === filterName)
    .map((filteredOrder) => (
      <Table
        TableHeaderData={HeaderData.filter(
          (e) => e.data["Order Number"] === filteredOrder[0].order_no
        )}
        TableData={filteredOrder}
        excludeKeys={excludeKeys}
        excludeValues={excludeValues}
      />
    ));
};

//set Header for title
const setHeader = (data) => {
  return {
    data: {
      "Purchase Order": "#513AB – 420BC",
      "Ordered By": "Lift",
      "Ordered On": "Oct 10, 2020 12:32PM",
      "Order Number": data.order_no,
    },
    status: data.status,
  };
};

//flatten the orders for easier manipulation with components
const cleanOrders = (data, order_no, status) => {
  let clean = [];
  data.forEach((order, i) => {
    clean.push({
      product_image: order.product_option.image,
      item: "Item" + (i + 1),
      size: order.product_option.name,
      quantity: order.quantity,
      priority: order.priority,
      pk: order.product_option.pk,
      order_no: order_no,
      status: status,
    });
  });
  return clean;
};

const DashboardOrders = () => {
  const { store } = useStores();
  const userData = JSON.parse(store.authStore.userData);
  const userId = userData.user_profile.facility;
  const [HeaderData, setHeaderData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const getData = async () =>
    await api
      .getOrderList(userId)
      .then((response) => {
        console.log(response.data);
        let data = response.data.map((orders) =>
          cleanOrders(orders.order_products, orders.order_no, orders.status)
        );
        setOrderData(data);
        setHeaderData(response.data.map((orders) => setHeader(orders)));
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getData();
  }, []);

  const excludeKeys = ["pk", "product_image"];
  const excludeValues = ["pk"];

  const TabData = (() => {
    if (orderData && HeaderData) {
      return [
        {
          heading: "All",

          content: orderData.map((order, i) => {
            return (
              <Table
                TableHeaderData={HeaderData.filter(
                  (e) => e.data["Order Number"] === order[0].order_no
                )}
                TableData={order}
                excludeKeys={excludeKeys}
                excludeValues={excludeValues}
              />
            );
          }),
          key: "all",
          amount: 1,
        },
        {
          heading: "Draft",
          content: Content(
            orderData,
            HeaderData,
            excludeKeys,
            excludeValues,
            "draft"
          ),
          key: "draft",
          amount: 0,
        },
        {
          heading: "Open",
          content: Content(
            orderData,
            HeaderData,
            excludeKeys,
            excludeValues,
            "open"
          ),
          key: "open",
          amount: 1,
        },
        {
          heading: "Approved",
          content: Content(
            orderData,
            HeaderData,
            excludeKeys,
            excludeValues,
            "approved"
          ),
          key: "approved",
          amount: 0,
        },
        {
          heading: "Delivered",
          content: Content(
            orderData,
            HeaderData,
            excludeKeys,
            excludeValues,
            "delivered"
          ),
          key: "delivered",
          amount: 0,
        },
        {
          heading: "Cancelled",
          content: Content(
            orderData,
            HeaderData,
            excludeKeys,
            excludeValues,
            "cancelled"
          ),
          key: "cancelled",
          amount: 0,
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

export default DashboardOrders;
