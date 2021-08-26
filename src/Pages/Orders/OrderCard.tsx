import clsx from "clsx";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import {
  HorizontalDetail,
  VerticalDetail,
} from "Components/InfoDisplay/LabeledDetails";
import OrderCardHeader from "Components/Order/OrderCardHeader";
import { api } from "Helpers/typedAPI";
import { capitalize } from "lodash";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
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
  const queryClient = useQueryClient();
  const deliveredMutation = useMutation(
    async () => {
      const client = await api.getClient();
      return client.post(orderProduct.url + "/mark-delivered");
    },
    { onSuccess: () => queryClient.invalidateQueries("orders") }
  );
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
        {/* Even if a ticket hasn't been marked as shipped, we still let
        orderers mark it as delivered, in case the supplier forgot to mark it*/}
        {ticket && ticket.status !== "delivered" && (
          <>
            <PrettyButton
              text="Mark as Delivered"
              color="green"
              onClick={() => deliveredMutation.mutate()}
              disabled={deliveredMutation.isLoading}
            />
            {/* <PrettyButton text="Contact Supplier" variant="outline" /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
