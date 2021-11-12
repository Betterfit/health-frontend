import clsx from "clsx";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import PaymentCard from "Components/Payment/PaymentCard";
import TransferCard from "Components/Payment/TransferCard";
import { api } from "Helpers/typedAPI";
import { useOrganization } from "Models/organization";
import { usePayments } from "Models/payments";
import ConnectedAccountCard from "Pages/AccountManagement/ConnectedAccountCard";
import PaymentMethods from "Pages/AccountManagement/PaymentMethods";
import React from "react";
import { useQuery } from "react-query";
import styles from "./PaymentsPage.module.css";

const PaymentsPage = () => {
  const { data: organization } = useOrganization();
  return (
    <div className={clsx("page")}>
      <Title>Payments</Title>
      <div className={clsx(styles.content)}>
        {/* suppliers and purchasers see different things */}
        {organization?.isSupplier && (
          <>
            <ConnectedAccountCard />
            <TransferList />
          </>
        )}
        {organization?.isPurchaser && (
          <>
            <PaymentMethods />
            <PaymentList />
          </>
        )}
      </div>
    </div>
  );
};

const PaymentList = () => {
  const paymentsQuery = usePayments({});
  if (!paymentsQuery.isSuccess) return <LoadingSpinner />;
  const payments = paymentsQuery.data;
  return (
    <div className={styles.transactionList}>
      <h2>Payment History</h2>
      {payments.map((payment) => (
        <PaymentCard key={payment.id} payment={payment} />
      ))}
    </div>
  );
};

const TransferList = () => {
  const transfersQuery = useQuery(["transfers"], () => api.getTransfers());
  if (!transfersQuery.isSuccess) return <LoadingSpinner />;
  const transfers = transfersQuery.data;
  return (
    <div className={styles.transactionList}>
      <h2>Received Payments</h2>
      <hr />
      {transfers.map((transfer) => (
        <TransferCard transfer={transfer} />
      ))}
    </div>
  );
};
export default PaymentsPage;
