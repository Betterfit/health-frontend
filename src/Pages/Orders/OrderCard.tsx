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
  const ticket = orderProduct.ticket;
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
        <HorizontalDetail label="Supplier" value={ticket?.supplier.name} />
        <HorizontalDetail label="Warehouse" value={ticket?.warehouse.name} />
        <HorizontalDetail label={"Total"} value={32} />
      </div>
      <div className={styles.detailList}>
        <HorizontalDetail
          label={"Shipping Provider"}
          value={ticket?.shippingProvider}
        />
        <HorizontalDetail
          label={"Tracking Number"}
          value={ticket?.trackingNumber}
        />
        <HorizontalDetail label={"Status"} value={capitalize(ticket?.status)} />
      </div>
      <div className={styles.orderProductActions}>
        {ticket && (
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
