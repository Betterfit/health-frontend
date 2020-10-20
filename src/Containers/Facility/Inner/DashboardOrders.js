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

const setHeader = (data) => {
  const HeaderData = {
    data: {
      "Purchase Order": "#513AB – 420BC",
      "Ordered By": "Lift",
      "Ordered On": "Oct 10, 2020 12:32PM",
      "Order Number": data.order_no,
    },
    status: data.status,
  };
  return HeaderData;
};

const filterItems = (data, filterName) => {
  let filtered = data.filter((item) => {
    if (item.status == filterName) {
      let filterItem = item;
      let filterItemStatus = filterItem.status; //save status to re-sort

      filterItem.facility = item.facility.name;

      delete filterItem.suppliaer;
      delete filterItem.order;
      delete filterItem.status;

      filterItem.status = filterItemStatus; // set status

      return filterItem;
    }
  });
  return filtered;
};

const cleanOrders = (data) => {
  let clean = []
  data.forEach((order) => {
    let size = clean.push([])
    order.forEach((e, i)=> {
      clean[size-1].push({
      product_image: e.product_option.image,
      item: "Item"+(i+1),
      size: e.product_option.name,
      quantity: e.quantity,
      priority: e.priority,
      pk: e.product_option.pk,
    })
  })
  });
  return clean;
};

const cleanOrders2 = (data) => {
  console.log("HERECLENA", data);
  data.forEach((e) => {
    console.log("HERECLENA", e);
    return {
      product_image: e.product_option.image,
      size: e.product_option.name,
      quantity: e.quantity,
      priority: e.priority,
      item: "Item1",
      pk: e.product_option.pk,
    };
  });
};


const DashboardOrders = () => {
  const { store } = useStores();
  const userData = JSON.parse(store.authStore.userData);
  const userId = userData.pk;
  const [HeaderData, setHeaderData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [HeaderData2, setHeaderData2] = useState(null);
  const [searchActive, setSearchActive] = useState(false);
  const [orderData2, setOrderData2] = useState(null);
  const [openOrders, setOpenOrders] = useState(null);
  const [shippedTickets, setShippedTickets] = useState(null);
  const getData = async () =>
    await api
      .getOrderList(userId)
      .then((response) => {
        console.log(response.data);
        let data = cleanOrders(response.data.map((orders) => orders.order_products));
        setHeaderData2(setHeader(response.data[0]));
        setOrderData(data);
        setHeaderData(response.data.map((orders) => setHeader(orders)));
        setOpenOrders(data);//hardcode for demo
        //setShippedTickets(ship);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getData();
  }, []);

  const excludeKeys = ["pk", "product_image"];
  const excludeValues = ["pk"];

  const TabData = (() => {
    if (orderData && HeaderData && openOrders) {
      return [
        {
          heading: "All",

          content: orderData.map((order, i) => {
            return (
              <Table
                TableHeaderData={HeaderData[i]}
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
          content: "DRAFT",
          key: "draft",
          amount: 0,
        },
        {
          heading: "Open",
          content: openOrders.map((order, i) => {
            return (
              <Table
                TableHeaderData={HeaderData[i]}
                TableData={order}
                excludeKeys={excludeKeys}
                excludeValues={excludeValues}
              />
            );
          }),
          key: "open",
          amount: 1,
        },
        {
          heading: "Approved",
          content: "APPROVED",
          key: "approved",
          amount: 0,
        },
        {
          heading: "Delivered",
          content: "DELIVERED",
          key: "delivered",
          amount: 0,
        },
        {
          heading: "Cancelled",
          content: "CANCELLED",
          key: "cancelled",
          amount: 0,
        },
      ];
    }
  })();
  console.log("Header", HeaderData);
  console.log("Data", orderData);
  console.log("TAb", orderData);
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
