import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import Tabs from "Components/Tabs/Tabs";
import { api } from "Helpers/typedAPI";
import { capitalize } from "lodash";
import React from "react";
import { useQuery } from "react-query";
import { Order } from "Types";
import OrderCard from "./OrderCard";
import styles from "./OrdersPage.module.css";
import OrdersPageEmpty from "Images/ordersPageEmpty.png";

const OrdersPage = () => {
  return (
    <div className="page">
      <Title>Orders</Title>
      <Orders />
    </div>
  );
};

const statuses = ["all", "draft", "approved", "cancelled", "delivered"];

const Orders = () => {
  const ordersQuery = useQuery<Order[], Error>(["orders"], async () => {
    const response = await api.getOrders();
    return response.data;
  });
  if (ordersQuery.isLoading || ordersQuery.isIdle)
    return <LoadingSpinner bubbleColor="gray" />;
  if (ordersQuery.isError) return <div>Error: {ordersQuery.error.message}</div>;
  const { data: orders } = ordersQuery;

  const ordersWithStatus = (status: string) =>
    status === "all"
      ? orders
      : orders.filter((order) => order.status === status);
  return (
    <>
      <Tabs
        amount
        tabs={statuses.map((status) => {
          const orders = ordersWithStatus(status);
          return {
            heading: capitalize(status),
            key: status,
            amount: orders.length,
            content:
              orders.length === 0 && status === "all" ? (
                <OrdersPagePlaceholder />
              ) : (
                <OrderList orders={orders} />
              ),
          };
        })}
      />
    </>
  );
};

const OrderList = ({ orders }: { orders: Order[] }) => (
  <div className={styles.orderList}>
    {orders.map((order) => (
      <OrderCard key={order.id} order={order} />
    ))}
  </div>
);

/*
  Placeholder component for zero amount of orders in the default tab (all orders)
*/
const OrdersPagePlaceholder = () => (
  <div className="justify-center">
    <Title>Welcome to Supply Net!</Title>
    <p className="text-status-dark-blue text-center">
      You don't have any outstanding orders. Feel free to explore the other
      <br />
      tabs to manage your stock levels, prices, users, and direst deposit info.
    </p>
    <img className="ml-auto mr-auto mt-8 mb-8" src={OrdersPageEmpty} alt="" />
    <p className="text-status-dark-blue text-center">
      Have any questions? Click the help button.
    </p>
  </div>
);

export default OrdersPage;
