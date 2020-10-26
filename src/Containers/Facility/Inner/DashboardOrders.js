import React, { useState, useEffect } from "react";
import Tabs from "Components/Tabs/Tabs";
import OrderSearch from "Components/Search/OrderSearch";
import Table from "Components/Table/Full/Table";
import Api from "Helpers/api";
import useStores from "Helpers/useStores";
import dayjs from 'dayjs';

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
    purchase_ord: data.purchase_no,
    ordered_by: data.facility_admin.user.first_name + " " + data.facility_admin.user.last_name,
    ordered_on: dayjs(data.order_date).format("MMM D, YYYY hh:mmA"), 
    order_no: data.order_no,
    status: data.status,
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
  const [orderCount, setOrderCountData] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const getData = async () =>
    await api
      .getOrderList(userId)
      .then((response) => {
        console.log(response.data);
        setOrderData(cleanOrders(response.data.orders));
        setOrderCountData(response.data.summary);
        console.log("orderCount", orderCount)
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getData();
  }, []);

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
  console.log("orderCount", orderCount)
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
