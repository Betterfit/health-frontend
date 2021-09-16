import { useOrganization } from "APIHooks/organization";
import clsx from "clsx";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import PaymentCard from "Components/Payment/PaymentCard";
import { api } from "Helpers/typedAPI";
import ConnectedAccountCard from "Pages/AccountManagement/ConnectedAccountCard";
import PaymentMethods from "Pages/AccountManagement/PaymentMethods";
import React from "react";
import { useQuery } from "react-query";
import styles from "./PaymentsPage.module.css";

const PaymentsPage = () => {
  const { data: organization } = useOrganization();
  return (
    <div className={clsx("page")}>
      <Title text="Payments" />
      <div className={clsx(styles.content)}>
        {organization?.isSupplier ? (
          <ConnectedAccountCard />
        ) : (
          <PaymentMethods />
        )}
        <PaymentCardList />
      </div>
    </div>
  );
};

const PaymentCardList = () => {
  const paymentsQuery = useQuery("payments", api.getPayments);
  if (!paymentsQuery.isSuccess) return <LoadingSpinner />;
  const payments = paymentsQuery.data;
  return (
    <div>
      <h2>Payment History</h2>
      {payments.map((payment) => (
        <PaymentCard payment={payment} />
      ))}
    </div>
  );
};
export default PaymentsPage;
