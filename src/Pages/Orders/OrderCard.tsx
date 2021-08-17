import clsx from "clsx";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import OrderCardHeader, {
  VerticalDetail,
} from "Components/Order/OrderCardHeader";
import { capitalize } from "lodash";
import React, { ReactNode } from "react";
import { Order, OrderProduct } from "Types";
import styles from "./OrderCard.module.css";

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className={clsx("cardBorder", styles.order)}>
      <OrderCardHeader order={order}>
        <VerticalDetail label="status" value={capitalize(order.status)} />
        {/* <Badge text={order.status} backgroundColor="green" /> */}
      </OrderCardHeader>
      {order.orderProducts.map((orderProduct, i) => (
        <OrderProductInfo key={i} {...{ order, orderProduct }} />
      ))}
    </div>
  );
};

const OrderProductInfo = ({
  orderProduct,
  order,
}: {
  orderProduct: OrderProduct;
  order: Order;
}) => {
  const product = orderProduct.productOption;
  return (
    <div className={styles.orderProduct}>
      <img src={product.productImage} alt={product.name + " Product Image"} />
      <div className={styles.detailList}>
        <HorizontalDetail
          label="Item"
          value={`${product.product} - ${product.productVariation}`}
        />
        <HorizontalDetail label="Quantity" value={orderProduct.quantity} />
        <HorizontalDetail label={product.optionLabel} value={product.name} />
      </div>
      <div className={styles.detailList}>
        <HorizontalDetail label="Supplier" value="Air Liquide" />
        <HorizontalDetail label={"Total"} value={32} />
      </div>
      <div className={styles.detailList}>
        <HorizontalDetail label={"Shipping Provider"} value="UPS" />
        <HorizontalDetail label={"Tracking Number"} value="1234234431423423" />
        <HorizontalDetail label={"Status"} value="Shipped" />
      </div>
      <div className={styles.orderProductActions}>
        {order.status === "approved" && (
          <>
            <PrettyButton text="Mark as Delivered" color="green" />
            <PrettyButton text="Contact Supplier" variant="outline" />
          </>
        )}
      </div>
    </div>
  );
};

const HorizontalDetail = ({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) => {
  return (
    <div className={styles.horizontalDetail}>
      <span className={styles.horizontalDetailLabel}>{label}</span>
      <span className={styles.horizontalDetailValue}>{value}</span>
    </div>
  );
};

export default OrderCard;
