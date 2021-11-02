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
            content: <OrderList orders={orders} />,
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

export default OrdersPage;
