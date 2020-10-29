import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import Api from "Helpers/api";
import { useHistory } from "react-router-dom";
import OrderHeader from "Components/Order/NewOrderHeader";
import OrderCart from "Components/Order/OrderCart";
import DashboardEditOrder from "Containers/Facility/Inner/DashboardEditOrder";
import DashboardNewOrder from "Containers/Facility/Inner/DashboardNewOrder";
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
import dayjs from "dayjs";
import { EditCartProvider } from "Context/editCartContext";
import { CartProvider } from "Context/cartContext";

const api = new Api();
const DashboardOrder = ({props, type}) => {
  console.log(type, "HERE");
  const history = useHistory();
  const { match } = props;

  return (
    <div className="flex flex-col md:flex-row">
      <DashboardSideBar addonStyles=" flex flex-col">
        {type === "edit" && (
            <EditCartProvider>
            <DashboardEditOrder {...props} />
            </EditCartProvider>
        )}
        {type === "new" && (
            <DashboardNewOrder {...props} />
        )}
      </DashboardSideBar>
      <div className="w-full md:w-3/5 mx-auto h-screen md:overflow-y-scroll">
        <Route
          exact
          path={`${match.path}`}
          exact
          render={(props) => {
            return <DashboardCategoryList {...props} />;
          }}
        />
        <Route
          path={`${match.path}/:categoryName/:id?`}
          exact
          render={(props) => {
              console.log("THIS MATCHES");
            return <DashboardCategoryProductList edit={true} {...props} />;
          }}
        />
        {
          <Route
            path={`${match.path}/:categoryName/:cid/product/:pid/:id?`}
            exact
            render={(props) => {
              return <DashboardProductDetail edit={true} {...props} />;
            }}
          /> /*
                <Route path='/dashboard/inventory/search:query?'>
                    <DashboardSearch />
                </Route> */
        }
      </div>
    </div>
  );
};

export default DashboardOrder;
