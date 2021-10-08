import clsx from "clsx";
import Badge from "Components/Forms/Badge/Badge";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import {
  HorizontalDetail,
  VerticalDetail,
} from "Components/InfoDisplay/LabeledDetails";
import OrderCardHeader from "Components/Order/OrderCardHeader";
import { api } from "Helpers/typedAPI";
import { capitalize } from "lodash";
import { orderCanBeEdited } from "Models/orders";
import { useMyProfile } from "Models/user";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch } from "Store/store";
import { Order, OrderProduct } from "Types";
import styles from "./OrderCard.module.css";

const OrderCard = ({ order }: { order: Order }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const detailLink = "/dashboard/orders/detail/" + order.id;
  const onDetailPage = history.location.pathname === detailLink;
  const { data: myProfile } = useMyProfile();
  return (
    <div
      // only act as a link to the detail page if we're not already on the detail page
      className={clsx(
        !onDetailPage && "cardBorder hoverShadowDark hoverGrow cursor-pointer",
        styles.order
      )}
      onClick={() => !onDetailPage && history.push(detailLink)}
      tabIndex={!onDetailPage ? 0 : -1}
      aria-label={`Order ${order.id}`}
      onKeyDown={(event) => {
        if (!onDetailPage && event.key === "Enter") history.push(detailLink);
      }}
    >
      <OrderCardHeader order={order}>
        {/* <VerticalDetail label="status" value={capitalize(order.status)} /> */}
        {/* <Badge text={order.status} backgroundColor="green" /> */}
        <VerticalDetail
          label="status"
          value={<StatusBadge status={order.status} />}
        />
      </OrderCardHeader>
      {onDetailPage && <hr />}
      {order.orderProducts.map((orderProduct, i) => (
        <OrderProductInfo key={i} {...{ order, orderProduct }} />
      ))}
      {onDetailPage && myProfile && orderCanBeEdited(order, myProfile) && (
        <PrettyButton
          text="Edit Order"
          className="mx-auto"
          onClick={() => {
            dispatch(cartActions.importOrder(order));
            history.push("/dashboard/new-order");
          }}
          variant="outline"
        />
      )}
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
        {/* <HorizontalDetail label={"Total"} value={32} /> */}
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
              onClick={deliveredMutation.mutate}
              disabled={deliveredMutation.isLoading}
            />
            {/* <PrettyButton text="Contact Supplier" variant="outline" /> */}
          </>
        )}
      </div>
    </div>
  );
};

const statusColors = {
  draft: "draft-blue",
  open: "lavender",
  approved: "tropical-blue",
  delivered: "cool-green",
  canceled: "rubber-red",
};
const StatusBadge = ({ status }: { status: keyof typeof statusColors }) => (
  <Badge backgroundColor={`var(--${statusColors[status]})`} text={status} />
);

export default OrderCard;
