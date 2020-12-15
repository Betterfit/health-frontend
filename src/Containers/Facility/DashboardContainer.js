import { CartProvider } from "Context/cartContext";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import DashboardResources from "../DashboardResources";
import DashboardFacilityOrder from "./Inner/DashboardFacilityOrderDetail";
import DashboardOrder from "./Inner/DashboardOrder";
import DashboardOrderList from "./Inner/DashboardOrderList";

const DashboardContainer = () => {
  return (
    <div className="flex flex-col w-full md:w-0 flex-1 overflow-hidden md:flex-row">
      <main
        className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
        tabIndex="0"
      >
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route
            exact
            path="/dashboard"
            render={() => <Redirect to="/dashboard/new-order/category/" />}
          />
          <Route
            exact
            path={["/dashboard/orders", "/dashboard/orders/search:query?"]}
            render={(props) => {
              return <DashboardOrderList {...props} />;
            }}
          />
          <Route
            path="/dashboard/edit-order/:oid"
            exact
            render={(props) => {
              let id = props.match.params.oid;
              return <Redirect to={`/dashboard/edit-order/${id}/category/`} />;
            }}
          />
          <Route
            path="/dashboard/edit-order/:oid/category"
            render={(props) => {
              return (
                <CartProvider value="editCart">
                  <DashboardOrder props={props} type="edit" />
                </CartProvider>
              );
            }}
          />
          <Route
            exact
            path="/dashboard/orders/detail/:id"
            render={(props) => {
              return <DashboardFacilityOrder {...props} />;
            }}
          />
          <Route
            path="/dashboard/new-order/category"
            render={(props) => {
              return (
                <CartProvider value="cart">
                  <DashboardOrder props={props} type="new" />
                </CartProvider>
              );
            }}
          />
          <Route path="/dashboard/resources">
            <DashboardResources
              initial
            />
          </Route>
        </AnimatedSwitch>
        {/* <!-- /End replace --> */}
      </main>
    </div>
  );
};

export default DashboardContainer;
