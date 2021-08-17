import { fullName } from "APIHooks/user";
import moment from "moment";
import React from "react";
import { Order } from "Types";
import styles from "./OrderCardHeader.module.css";

const OrderCardHeader = ({
  order,
  children,
}: {
  order: Order;
  children?: React.ReactNode;
}) => {
  // Formats like this: Aug 16, 2021 - 6:07 PM
  // https://momentjs.com/docs/#/displaying/
  const date = moment(order.orderDate).format("MMM D, YYYY - h:mm A");
  return (
    <div className={styles.orderHeader}>
      <OrderDetail label="Ordered by" value={fullName(order.authorUser)} />
      <OrderDetail label="Ordered on" value={date} />
      <OrderDetail label="Destination" value={order.facility.name} />
      {children}
    </div>
  );
};

const OrderDetail = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={styles.orderDetail}>
      <span className={styles.orderDetailLabel}>{label}</span>
      <span className={styles.orderDetailValue}>{value}</span>
    </div>
  );
};

export default OrderCardHeader;
