import DashboardResources from "Containers/DashboardResources";
import DashboardOrder from "Containers/Facility/Inner/DashboardOrder";
import styles from "Dashboard/Dashboard.module.css";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import AccountManagement from "Routes/AccountManagement/AccountManagement";
import InventoryPage from "Routes/Inventory/InventoryPage";
import OrderDetail from "Routes/Orders/OrderDetail";
import OrdersPage from "Routes/Orders/OrdersPage";
import PaymentsPage from "Routes/Payments/PaymentsPage";
import ShippingPage from "Routes/Shipping/ShippingPage";
import TicketDetail from "Routes/Tickets/TicketDetail";
import TicketsPage from "Routes/Tickets/TicketsPage";
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
      {/* <Route exact path="/dashboard/requests">
        <RequestsPage />
      </Route> */}
      <Route
        exact
        path="/dashboard/orders/detail/:id"
        render={(props) => {
          return <OrderDetail orderId={Number(props.match.params.id)} />;
        }}
      />
      <Route path="/dashboard/new-order">
        <DashboardOrder />
      </Route>
      {/* Supplier Routes */}
      <Route exact path="/dashboard/tickets/">
        <TicketsPage />
      </Route>
      <Route
        exact
        path="/dashboard/tickets/:id"
        render={(props) => {
          return <TicketDetail ticketId={Number(props.match.params.id)} />;
        }}
      />
      <Route path="/dashboard/inventory">
        <InventoryPage />
      </Route>
      <Route path="/dashboard/shipping">
        <ShippingPage />
      </Route>
      {/* Publicly Accessible */}
      <Route path="/dashboard/resources">
        <DashboardResources />
      </Route>
    </main>
  );
};

export default DashboardRoutes;
