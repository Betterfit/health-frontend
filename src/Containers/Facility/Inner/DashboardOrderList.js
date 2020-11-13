import React, { useState, useEffect } from "react";

import Api from "Helpers/api";
import dayjs from "dayjs";
import { useAuthStore } from "Context/authContext";

// <----------- Components ------------->//
import Tabs from "Components/Tabs/Tabs";
import OrderSearch from "Components/Search/OrderSearch";
import Table from "Components/Table/Full/Table";
import DashboardOrderSearch from "./DashboardOrderSearch";
//  <---- Menu Components ----> //
import ButtonOption from "Components/Content/Menu/ButtonOption";
import TextOptions from "Components/Content/Menu/TextOption";
import PopupMenu from "Components/Content/Menu/PopUpMenu";
import { keys } from "mobx";
import uuid from 'react-uuid';
import {
  Switch,
  Route,
  useParams,
  useLocation
} from "react-router-dom";
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
        let arr = response.data.orders.map((item) => {
          let header = setHeader(item);
          header.order_products = item.order_products.map((products) => {
            let obj = {
              product_image: products.product_option.product_image,
              item: products.product_option.product_variation,
              size: products.product_option.name,
              quantity: products.quantity,
              priority: products.priority,
              pk: products.product_option.pk,
            };
            return obj;
          });
          return header;
        });
        setOrderData(arr);
        setOrderCountData(response.data.summary);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getData();
  }, []);

  const FilterOrders = (data, excludeKeys, excludeValues, filterName) => {
    return data
      .filter((order, i) => order.status === filterName)
      .map((filteredOrder) =>(
        <Table
          TableData={filteredOrder}
          excludeKeys={excludeKeys}
          excludeValues={excludeValues}
          key={uuid()}
        />
      ));
  };

  //delete a draft order
  const callbackDelete = (orderId, orderNo) => {
    api
      .deleteOrder(orderId, orderNo)
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.error("Delete Error", error);
      });
  };

  //submit a draft order.
  const callbackSubmit = (orderId, orderNo) => {
    api
      .submitDraft(orderId, orderNo)
      .then((response) => {
        getData();
      })
      .catch((error) => {
        console.error("Submit Error", error);
      });
  };

  //set Header for title
  const setHeader = (data) => {
    //set options for menu for header
    const setOptions = (data) => {
      return (
        <PopupMenu>
          <TextOptions
            value="Edit"
            href={`edit-order/${data.pk}`}
          ></TextOptions>
          <TextOptions
            value="Cancel"
            onClick={() => callbackDelete(data.pk, data.order_no)}
          ></TextOptions>
          <ButtonOption
            value="Submit"
            onClick={() => callbackSubmit(data.pk, data.order_no)}
          ></ButtonOption>
        </PopupMenu>
      );
    };

    return {
      purchase_ord: data.purchase_no,
      ordered_by:
        data.facility_admin.user.first_name +
        " " +
        data.facility_admin.user.last_name,
      ordered_on: dayjs(data.order_date).format("MMM D, YYYY hh:mmA"),
      order_no: data.order_no,
      status: data.status,
      id: data.pk,
      url: `/dashboard/orders/detail/${data.pk}`,
      options: data.status === "draft" ? setOptions(data) : [],
    };
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
                key={uuid()}
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
      <Route exact path='/dashboard/orders'>
        <h2 className="text-3xl text-dark-blue my-3">Orders</h2>
      </Route>
      {TabData && (
          <>          
            <OrderSearch extraClasses="float-right clear-both"  callBack={(e) => setSearchActive(e)} searchActive={searchActive} />
            <Route exact path='/dashboard/orders'>
              <Tabs tabs={TabData} amount={true}  />
            </Route>
          </>
        )}
      <Route path="/dashboard/orders/search:query?">
            <DashboardOrderSearch />
      </Route>
    </div>
    
  );
};

export default DashboardOrderList;
