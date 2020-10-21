import React, { useState, useEffect } from "react";
import Tabs from "Components/Tabs/Tabs";
import OrderSearch from "Components/Search/OrderSearch";
import Table from "Components/Table/Full/Table";
import Api from "Helpers/api";
import useStores from "Helpers/useStores";

const api = new Api();

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

//set Header for title
const setHeader = (data) => {
  return {
    purchase_ord: "#513AB – 420BC",
    ordered_by: "Lift",
    ordered_on: "Oct 10, 2020 12:32PM",
    order_no: data.order_no,
    status: data.status,
  };
};

//flatten the orders for easier manipulation with components
const cleanOrderItems = (data) => {
  let clean = [];
  data.forEach((order, i) => {
    clean.push({
      product_image: order.product_option.image,
      item: "Item" + (i + 1),
      size: order.product_option.name,
      quantity: order.quantity,
      priority: order.priority,
      pk: order.product_option.pk,
    });
  });
  return clean;
};

//flatten the orders for easier manipulation with components
const cleanOrders = (data) => {
  let clean = [];
  data.forEach((order, i) => {
    let header = setHeader(order);
    let products = cleanOrderItems(order.order_products);
    header.order_products = products;
    clean.push(header);
  });

  return clean;
};

const DashboardOrders = () => {
  const { store } = useStores();
  const userData = JSON.parse(localStorage.getItem('user')) 
  const userId = userData.user_profile.facility;
  const [orderData, setOrderData] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const getData = async () =>
    await api
      .getOrderList(userId)
      .then((response) => {
        console.log(response.data);
        setOrderData(cleanOrders(response.data));
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getData();
  }, []);

  const excludeKeys = ["pk", "product_image"];
  const excludeValues = ["pk"];

  const TabData = (() => {
    if (orderData) {
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
          amount: 1,
        },
        {
          heading: "Draft",
          content: FilterOrders(orderData, excludeKeys, excludeValues, "draft"),
          key: "draft",
          amount: 0,
        },
        {
          heading: "Open",
          content: FilterOrders(orderData, excludeKeys, excludeValues, "open"),
          key: "open",
          amount: 1,
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
          amount: 0,
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
          amount: 0,
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
