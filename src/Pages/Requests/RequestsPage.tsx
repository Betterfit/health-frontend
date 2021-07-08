import { fullName } from "APIHooks/user";
import IconButton from "Components/Content/IconButton";
import Title from "Components/Content/Title";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import SearchBar from "Components/Search/SearchBar";
import moment from "moment";
import React, { useState } from "react";
import { UserProfile } from "Types";
import RequestedProductCard from "./RequestedProductCard";
import styles from "./RequestsPage.module.css";
const RequestPage = () => {
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
        {orders.map((order) => (
          <RequestedOrderCard order={order} />
        ))}
      </div>
    </div>
  );
};
export default RequestPage;

const RequestedOrderCard = ({ order }: { order: Order }) => {
  const totalPrice = "$625.00 CAD";
  return (
    <div className={styles.order}>
      <div className={styles.orderTitle}>
        <p>
          <b>{order.facility}</b> - <b>{order.createdDate}</b>
        </p>
        <p>
          By: <b>{fullName(order.author as UserProfile)}</b>
        </p>
        <p>
          Request ID: <b>{order.id}</b>
        </p>
      </div>
      {order.products.map((product) => (
        <RequestedProductCard {...{ order, product }} />
      ))}
      <div className={styles.orderBottom}>
        <p className="py-2">
          Order Total: <span className={styles.money}>{totalPrice}</span>
        </p>
        <div className={styles.orderActions}>
          <PrettyButton text="Approve" color="green" />
          <PrettyButton text="Deny" color="red" />
        </div>
      </div>
    </div>
  );
};

const maskImage =
  "https://staging.api.betterfit.health/main/media/41EBUpNezEL.jpg";
const orders = [
  {
    facility: "Royal Crom Hospital",
    author: { firstName: "Alex", lastName: "Lee" },
    createdDate: "July 4, 2021",
    id: 1557,
    products: [
      {
        name: "3M N95 - 8210",
        quantity: 12,
        size: "10/Box",
        supply: "In Stock",
        imageUrl: maskImage,
        suppliers: [
          { name: "Air Liquide", pricePerUnit: 1.05 },
          { name: "The Canadian Shield", pricePerUnit: 1.05 },
        ],
      },
      {
        name: "3M N95 - 9221+",
        quantity: 10,
        size: "10/Box",
        supply: "Low",
        imageUrl: maskImage,
        suppliers: [
          { name: "The Canadian Shield", pricePerUnit: 1.55 },
          { name: "Air Liquide", pricePerUnit: 1.05 },
        ],
      },
      {
        name: "3M N95 - 9221+",
        quantity: 10,
        size: "10/Box",
        supply: "Low",
        imageUrl: maskImage,
        suppliers: [
          { name: "The Canadian Shield", pricePerUnit: 1.55 },
          { name: "Air Liquide", pricePerUnit: 1.05 },
        ],
      },
    ],
  },
  {
    facility: "Royal Crom Hospital",
    author: { firstName: "Alex", lastName: "Lee" },
    createdDate: "July 4, 2021",
    id: 1557,
    products: [
      {
        name: "3M N95 - 8210",
        quantity: 12,
        size: "10/Box",
        supply: "In Stock",
        imageUrl: maskImage,
        suppliers: [
          { name: "Air Liquide", pricePerUnit: 1.05 },
          { name: "The Canadian Shield", pricePerUnit: 1.05 },
        ],
      },
    ],
  },
];

// const div = ({ label, children }: { label: string; children: ReactNode }) => {
//   return (
//     <div className={styles.labeledContent}>
//       <p className={styles.label}>{label}</p>
//       {children}
//     </div>
//   );
// };

export type Order = typeof orders[number];
export type OrderProduct = Order["products"][number];
export const formatCurrency = (price: number) => `$${price.toFixed(2)} CAD`;
