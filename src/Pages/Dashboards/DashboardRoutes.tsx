import DashboardResources from "Containers/DashboardResources";
import DashboardFacilityOrder from "Containers/Facility/Inner/DashboardFacilityOrderDetail";
import DashboardOrder from "Containers/Facility/Inner/DashboardOrder";
import DashboardOrderList from "Containers/Facility/Inner/DashboardOrderList";
import DashboardInventory from "Containers/Supplier/Inner/DashboardInventory";
import DashboardTicketDetail from "Containers/Supplier/Inner/DashboardTicketDetail";
import DashboardTickets from "Containers/Supplier/Inner/DashboardTickets";
import DashboardMatches from "Containers/Traffic/Inner/DashboardMatches";
import DashboardMatchesHistory from "Containers/Traffic/Inner/DashboardMatchesHistory";
import DashboardMatchesListing from "Containers/Traffic/Inner/DashboardMatchesListing";
import DashboardMatchesOrderDetail from "Containers/Traffic/Inner/DashboardMatchesOrderDetail";
import DashboardTrafficDashboard from "Containers/Traffic/Inner/DashboardTrafficDashboard";
import { CartProvider } from "Context/cartContext";
import { MatchProvider } from "Context/matchContext";
import AccountManagement from "Pages/AccountManagement/AccountManagement";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { NavItem } from "./DynamicDashboard";

export interface DashboardRoutesProps {
  navItems: NavItem[];
}
const DashboardRoutes = ({ navItems }: DashboardRoutesProps) => {
  return (
    <div className="flex flex-col w-full md:w-0 flex-1 overflow-hidden md:flex-row">
      <main
        className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
        tabIndex={0}
      >
        <Route
          exact
          path="/dashboard"
          // navItems is it sorted order of precedence
          // so we redirect to the highest precedents item
          render={() => <Redirect to={navItems[0].to} />}
        />
        {/* Purchaser Routes */}
        <Route path="/dashboard/accounts">
          <AccountManagement />
        </Route>
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
        {/* Supplier Routes */}
        <Route path="/dashboard/tickets/">
          <DashboardTickets />
        </Route>
        <Route
          exact
          path="/dashboard/ticket/:id"
          render={(props) => {
            return <DashboardTicketDetail {...props} />;
          }}
        />
        <Route path="/dashboard/inventory">
          <DashboardInventory />
        </Route>
        <Route exact path="/dashboard/matches">
          <DashboardMatchesListing />
        </Route>
        <Route exact path="/dashboard/matches/current">
          <MatchProvider>
            <DashboardMatches />
          </MatchProvider>
        </Route>
        <Route exact path="/dashboard/matches/history:query?">
          {/* this component takes a weird prop, will have to fix later */}
          <DashboardMatchesHistory props={{}} />
        </Route>
        <Route
          exact
          path="/dashboard/matches/:id/"
          render={(props) => {
            return <DashboardMatchesOrderDetail {...props} />;
          }}
        />
        <Route path="/dashboard/traffic-dashboard">
          <DashboardTrafficDashboard />
        </Route>
        {/* Publicly Accessible */}
        <Route path="/dashboard/resources">
          <DashboardResources />
        </Route>
      </main>
    </div>
  );
};

export default DashboardRoutes;
