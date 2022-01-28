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
      {myProfile && orderCanBeEdited(order, myProfile) && (
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
    async () => api.markOrderProductDelivered(orderProduct.id),
    { onSuccess: () => queryClient.invalidateQueries("orders") }
  );
  const product = orderProduct.productOption;
  return (
    <div
      className={styles.orderProduct}
      data-testid={"orderProduct"}
      data-ticketid={orderProduct.id}
    >
      <img src={product.productImage} alt={product.name + " Product Image"} />
      <div className={styles.detailList}>
        <HorizontalDetail label="Item" value={product.product} />
        <HorizontalDetail label="Quantity" value={orderProduct.quantity} />
        <HorizontalDetail label={product.optionLabel} value={product.name} />
      </div>
      <div className={styles.detailList}>
        <HorizontalDetail
          label="Supplier"
          value={orderProduct.supplier?.name}
        />
        <HorizontalDetail
          label="Warehouse"
          value={orderProduct.warehouse?.name}
        />
        <HorizontalDetail label="Ticket #" value={orderProduct.id} />
        {/* <HorizontalDetail label={"Total"} value={32} /> */}
      </div>
      <div className={styles.detailList}>
        <HorizontalDetail
          label={"Shipping Provider"}
          value={orderProduct.shippingProvider}
        />
        <HorizontalDetail
          label={"Tracking Number"}
          value={orderProduct.trackingNumber}
        />
        <HorizontalDetail
          label={"Status"}
          value={capitalize(orderProduct.status)}
        />
      </div>
      <div className={styles.orderProductActions}>
        {/* Even if a ticket hasn't been marked as shipped, we still let
        orderers mark it as delivered, in case the supplier forgot to mark it*/}
        {order.status === "approved" && orderProduct.status !== "delivered" && (
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
  cancelled: "rubber-red",
};
const StatusBadge = ({ status }: { status: keyof typeof statusColors }) => (
  <Badge backgroundColor={`var(--${statusColors[status]})`} text={status} />
);

export default OrderCard;
