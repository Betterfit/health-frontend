import { fullName } from "APIHooks/user";
import IconButton from "Components/Content/IconButton";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import SearchBar from "Components/Search/SearchBar";
import { api } from "Helpers/typedAPI";
import moment from "moment";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Order } from "Types";
import RequestedProductCard from "./RequestedProductCard";
import styles from "./RequestsPage.module.css";

const RequestPage = () => {
  const { data: orders } = useQuery<Order[]>(["orders", "requested"], () => {
    return api.getOrders("open").then((response) => response.data);
  });
  const [searchText, setSearchText] = useState("");
  return (
    <div className={styles.root}>
      <div className={styles.titleSection}>
        <Title text="Requests" />
        <span className="mt-2">{moment().format("MMMM D, YYYY")}</span>
      </div>
      <div className={styles.actionBar}>
        <PrettyButton text="Approve All" color="green" />
        <SearchBar
          performSearch={setSearchText}
          placeholderText="Search Requests"
          startingText={searchText}
          // only perform search after the user has stopped typing for 100ms
          msDelay={100}
          className={styles.search}
        />
        <IconButton iconName="filter_list" />
      </div>
      <div className={styles.orders}>
        {orders ? (
          orders.map((order) => <RequestedOrderCard order={order} />)
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};
export default RequestPage;

const RequestedOrderCard = ({ order }: { order: Order }) => {
  const queryClient = useQueryClient();
  const orderStatusMutation = useMutation(
    (action: "cancel" | "approve") =>
      api.getClient().then((client) => client.post(order.url + "/" + action)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]);
        // future performance optimization so that we don't have to query the
        // server every time we approve or deny an order
        // queryClient.setQueryData(["orders", "requested"], (oldOrders: any) =>
        //   oldOrders?.filter((oldOrder: Order) => oldOrder.pk !== order.pk)
        // );
      },
      onError: () => {
        alert("Could not update order status");
      },
    }
  );

  const totalPrice = "$625.00 CAD";
  const date = new Date(order.orderDate).toLocaleDateString();

  const denyOrder = () => orderStatusMutation.mutate("cancel");
  const approveOrder = () => orderStatusMutation.mutate("approve");
  const showLoadingOverlay = orderStatusMutation.isLoading;

  return (
    <div className={styles.order}>
      <div className={"overlay " + (showLoadingOverlay && "overlayVisible")}>
        {showLoadingOverlay && <LoadingSpinner />}
      </div>
      <div className={styles.orderTitle}>
        <p>
          <b>{order.facility.name}</b> - <b>{date}</b>
        </p>
        <p>
          By: <b>{fullName(order.authorUser)}</b>
        </p>
        <p>
          Order ID: <b>{order.orderNo}</b>
        </p>
      </div>
      {order.orderProducts.map((orderProduct) => (
        <RequestedProductCard
          key={orderProduct.pk}
          {...{ order, orderProduct }}
        />
      ))}
      <div className={styles.orderBottom}>
        <p className="py-2">
          Order Total: <span className={styles.money}>{totalPrice}</span>
        </p>
        <div className={styles.orderActions}>
          <PrettyButton
            text="Approve"
            color="green"
            onClick={approveOrder}
            icon="done"
          />
          <PrettyButton
            text="Deny"
            color="red"
            onClick={denyOrder}
            icon="close"
          />
        </div>
      </div>
    </div>
  );
};

const maskImage =
  "https://staging.api.betterfit.health/main/media/41EBUpNezEL.jpg";
// const orders = [
//   {
//     facility: "Royal Crom Hospital",
//     author: { firstName: "Alex", lastName: "Lee" },
//     createdDate: "July 4, 2021",
//     id: 1557,
//     products: [
//       {
//         name: "3M N95 - 8210",
//         quantity: 12,
//         size: "10/Box",
//         supply: "In Stock",
//         imageUrl: maskImage,
//         suppliers: [
//           { name: "Air Liquide", pricePerUnit: 1225.05 },
//           { name: "The Canadian Shield", pricePerUnit: 1.05 },
//           { name: "The Canadian Shield", pricePerUnit: 1.05 },
//         ],
//       },
//       {
//         name: "3M N95 - 9221+",
//         quantity: 10,
//         size: "10/Box",
//         supply: "Low",
//         imageUrl: maskImage,
//         suppliers: [
//           { name: "The Canadian Shield", pricePerUnit: 1.55 },
//           { name: "Air Liquide", pricePerUnit: 1.05 },
//         ],
//       },
//       {
//         name: "3M N95 - 9221+",
//         quantity: 10,
//         size: "10/Box",
//         supply: "Low",
//         imageUrl: maskImage,
//         suppliers: [
//           { name: "The Canadian Shield", pricePerUnit: 1.55 },
//           { name: "Air Liquide", pricePerUnit: 1.05 },
//         ],
//       },
//     ],
//   },
//   {
//     facility: "Royal Crom Hospital",
//     author: { firstName: "Alex", lastName: "Lee" },
//     createdDate: "July 4, 2021",
//     id: 1557,
//     products: [
//       {
//         name: "3M N95 - 8210",
//         quantity: 12,
//         size: "10/Box",
//         supply: "In Stock",
//         imageUrl: maskImage,
// suppliers: [
//   { name: "Air Liquide", pricePerUnit: 1.05 },
//   { name: "The Canadian Shield", pricePerUnit: 1.05 },
//         ],
//       },
//     ],
//   },
// ];

// export type Order = typeof orders[number];
// export type OrderProduct = Order["products"][number];
// export type Supplier = OrderProduct["suppliers"][number];
export const formatCurrency = (price: number) => `$${price.toFixed(2)} CAD`;
