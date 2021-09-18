import clsx from "clsx";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import BackNavigation from "Components/Helpers/BackNavigation";
import PaymentCard from "Components/Payment/PaymentCard";
import { useOrder } from "Models/orders";
import { usePayments } from "Models/payments";
import React from "react";
import { useHistory } from "react-router-dom";
import OrderCard from "./OrderCard";
import styles from "./OrderDetail.module.css";

const OrderDetail = ({ orderId }: { orderId: number }) => {
  const { data: order } = useOrder(orderId);
  const { data: payments } = usePayments({ order: orderId });
  const history = useHistory();
  return (
    <div className={clsx("page", styles.root)}>
      <BackNavigation
        link="Back to Orders"
        onClickOverride={() => history.push("/dashboard/orders")}
      />
      <Title text={"Order #" + orderId} />
      {order ? <OrderCard order={order} /> : <LoadingSpinner />}
      <hr />
      {payments && (
        <>
          {payments.length > 0 && <h2 className="text-2xl">Payments</h2>}
          <ul className={styles.paymentList}>
            {payments.map((payment) => (
              <PaymentCard payment={payment} key={payment.id} startExpanded />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
