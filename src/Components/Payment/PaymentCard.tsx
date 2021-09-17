import clsx from "clsx";
import AnimatedHeightChange from "Components/Content/AnimatedHeightChange";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import {
  HorizontalDetail,
  VerticalDetail,
} from "Components/InfoDisplay/LabeledDetails";
import { api } from "Helpers/typedAPI";
import { formatTimeStamp } from "Helpers/utils";
import { productDisplayName } from "Models/products";
import { fullName } from "Models/user";
import { formatCurrency } from "Pages/Requests/RequestsPage";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Order, OrderProduct, Payment } from "Types";
import styles from "./PaymentCard.module.css";

const PaymentCard = ({
  payment,
  startExpanded = false,
}: {
  payment: Payment;
  startExpanded?: boolean;
}) => {
  const [expanded, setExpanded] = useState(startExpanded);
  const orderQuery = useQuery(
    ["orders", { id: payment.orderId }],
    () => api.getOrder(payment.orderId),
    { enabled: expanded }
  );
  const { data: order } = orderQuery;
  return (
    <AnimatedHeightChange className={clsx("cardBorder")}>
      <div className={styles.card}>
        <div className={clsx("cardHeader")}>
          <VerticalDetail
            label="Payment Date"
            value={formatTimeStamp(payment.timeCreated)}
          />
          <VerticalDetail
            label="Payment Method"
            value={payment.paymentMethodName}
          />
          <VerticalDetail
            label="Authorized By"
            value={fullName(payment.payer)}
          />
          <VerticalDetail
            label="Amount"
            value={formatCurrency(Number(payment.total))}
          />
        </div>
        {expanded && <PaymentDetails {...{ payment, order }} />}
        <PrettyButton
          variant="link"
          text={expanded ? "Hide Details" : "View Details"}
          icon={expanded ? "expand_less" : "expand_more"}
          onClick={() => setExpanded(!expanded)}
        />
      </div>
    </AnimatedHeightChange>
  );
};

const PaymentDetails = ({
  payment,
  order,
}: {
  payment: Payment;
  order?: Order;
}) => {
  const subtotal =
    Number(payment.total) - Number(payment.appFee) - Number(payment.taxes);
  return (
    <div className={styles.details}>
      <LoadingSpinner show={!order} darkened />
      {order && (
        <>
          <div className={styles.orderProductList}>
            {order.orderProducts.map((orderProduct) => (
              <OrderProductInvoice {...{ orderProduct }} />
            ))}
          </div>
          <div className={styles.overview}>
            <p>Payment Overview</p>
            <HorizontalDetail
              label="Base Total"
              value={formatCurrency(subtotal)}
              fullWidth
            />
            <HorizontalDetail
              label="Taxes"
              value={formatCurrency(payment.taxes)}
              fullWidth
            />
            <HorizontalDetail
              label="SupplyNet Fee"
              value={formatCurrency(payment.appFee)}
              fullWidth
            />
            <hr />
            <HorizontalDetail
              label="Grand Total"
              value={formatCurrency(payment.total)}
              fullWidth
            />
          </div>
        </>
      )}
    </div>
  );
};

const OrderProductInvoice = ({
  orderProduct,
}: {
  orderProduct: OrderProduct;
}) => {
  const subtotal =
    Number(orderProduct.pricePerUnit) * Number(orderProduct.quantity) +
    Number(orderProduct.shipping);
  return (
    <div className={styles.orderProduct}>
      <HorizontalDetail
        label="Item"
        value={productDisplayName(orderProduct.productOption)}
      />
      <HorizontalDetail label="Quantity" value={orderProduct.quantity} />
      <HorizontalDetail
        label="Price Per Unit"
        value={formatCurrency(Number(orderProduct.pricePerUnit))}
      />
      <HorizontalDetail
        label="Shipping"
        value={formatCurrency(Number(orderProduct.shipping))}
      />
      <HorizontalDetail label="Subtotal" value={formatCurrency(subtotal)} />
    </div>
  );
};

export default PaymentCard;
