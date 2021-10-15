import DashboardResources from "Containers/DashboardResources";
import DashboardOrder from "Containers/Facility/Inner/DashboardOrder";
import styles from "Dashboard/Dashboard.module.css";
import AccountManagement from "Pages/AccountManagement/AccountManagement";
import InventoryPage from "Pages/Inventory/InventoryPage";
import OrderDetail from "Pages/Orders/OrderDetail";
import OrdersPage from "Pages/Orders/OrdersPage";
import PaymentsPage from "Pages/Payments/PaymentsPage";
import RequestsPage from "Pages/Requests/RequestsPage";
import TicketsPage from "Pages/Tickets/TicketsPage";
import React from "react";
import { Redirect, Route } from "react-router-dom";
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
      <Route exact path="/dashboard/requests">
        <RequestsPage />
      </Route>
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
      <Route path="/dashboard/tickets/">
        <TicketsPage />
      </Route>
      <Route path="/dashboard/inventory">
        <InventoryPage />
      </Route>
      {/* Publicly Accessible */}
      <Route path="/dashboard/resources">
        <DashboardResources />
      </Route>
    </main>
  );
};

export default DashboardRoutes;
