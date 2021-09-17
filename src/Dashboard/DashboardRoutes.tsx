import DashboardResources from "Containers/DashboardResources";
import DashboardFacilityOrder from "Containers/Facility/Inner/DashboardFacilityOrderDetail";
import DashboardOrder from "Containers/Facility/Inner/DashboardOrder";
import DashboardInventory from "Containers/Supplier/Inner/DashboardInventory";
import DashboardTicketDetail from "Containers/Supplier/Inner/DashboardTicketDetail";
import { CartProvider } from "Context/cartContext";
import AccountManagement from "Pages/AccountManagement/AccountManagement";
import OrdersPage from "Pages/Orders/OrdersPage";
import PaymentsPage from "Pages/Payments/PaymentsPage";
import RequestsPage from "Pages/Requests/RequestsPage";
import TicketsPage from "Pages/Tickets/TicketsPage";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { NavItem } from "./DynamicDashboard";

export interface DashboardRoutesProps {
  navItems: NavItem[];
}
const DashboardRoutes = ({ navItems }: DashboardRoutesProps) => {
  return (
    <main className={styles.content}>
      <Route
        exact
        path="/dashboard"
        // navItems is it sorted order of precedence
        // so we redirect to the highest precedents item
        render={() => <Redirect to={navItems[0].to} />}
      />
      {/* Purchaser Routes */}
      <Route path="/dashboard/admin">
        <AccountManagement />
      </Route>
      <Route path="/dashboard/payments">
        <PaymentsPage />
      </Route>
      <Route
        exact
        path={["/dashboard/orders", "/dashboard/orders/search:query?"]}
      >
        <OrdersPage />
      </Route>
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
      <Route exact path="/dashboard/requests">
        <RequestsPage />
      </Route>
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
        <TicketsPage />
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
      {/* Publicly Accessible */}
      <Route path="/dashboard/resources">
        <DashboardResources />
      </Route>
    </main>
  );
};

export default DashboardRoutes;
