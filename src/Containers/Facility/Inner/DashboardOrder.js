import React, { useState, useEffect } from "react";

import Api from "Helpers/api";
import { useHistory } from "react-router-dom";
import DashboardEditOrder from "Containers/Facility/Inner/DashboardEditOrder";
import DashboardNewOrder from "Containers/Facility/Inner/DashboardNewOrder";
import DashboardCategoryProductList from "Containers/Facility/Inner/DashboardCategoryProductList";
import DashboardProductDetail from "Containers/Facility/Inner/DashboardProductDetail";
import DashboardCategoryList from "Containers/Facility/Inner/DashboardCategoryList";
import DashboardProductSearch from "./DashboardProductSearch";
import { Switch, Route, useParams } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import { useCartStore } from "Context/cartContext";
const api = new Api();
const DashboardOrder = ({props, type}) => {
  const cartStore = useCartStore();
  const history = useHistory();
  const { match } = props;
  useEffect(() => {
    cartStore.getLocalCartStorage();
  }, []);
  return (
    <div className="flex flex-col md:flex-row">
      <DashboardSideBar addonStyles=" flex flex-col" padding="p-0" >
        {type === "edit" && (
            <DashboardEditOrder {...props} />
        )}
        {type === "new" && (
            <DashboardNewOrder {...props} />
        )}
      </DashboardSideBar>
      <div className="w-full min-width-0 md:w-3/5 mx-auto h-screen md:overflow-y-scroll mt-2">
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
            return <DashboardCategoryProductList edit={true} {...props} type={type} orderId={ parseInt(match.params.oid) ? parseInt(match.params.oid) : null } />;
          }}
        />
        
        <Route
          path={`${match.path}/:categoryName/:cid/product/:pid/:id?`}
          exact
          render={(props) => {
            return <DashboardProductDetail edit={true} {...props} />;
          }}
        /> 
        <Route exact path={[`${match.path}/:categoryName/:id?/search:query?`,`${match.path}/:id?/category/:categoryName/:oid?search:query?`]}>
          <DashboardProductSearch />
        </Route> 
      
      </div>
    </div>
  );
};

export default DashboardOrder;
