import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { api } from "Helpers/typedAPI";
import React from "react";
import { useMutation } from "react-query";
import styles from "./ConnectedAccount.module.css";

const ConnectedAccount = () => {
  const accountSetUp = false;
  return (
    <div className={styles.root}>
      {accountSetUp ? <DisplayConnectedAccount /> : <EmptyConnectedAccount />}
    </div>
  );
};

const EmptyConnectedAccount = () => {
  const setUpConnectedAccount = useMutation(async () => {
    const client = await api.getClient();
    const resp = await client.post("/connected-accounts/setup");
    const url = resp.data.url;
    window.location.href = url;
  });
  return (
    <>
      <p className={styles.cardTitle}>Connect Account</p>
      <p>
        You will need to set up a Stripe connected account in order to receive
        payments from purchasers.
      </p>
      <PrettyButton
        text="Setup Connected Account"
        className="mt-2"
        onClick={setUpConnectedAccount.mutate}
        disabled={setUpConnectedAccount.isLoading}
      />
    </>
  );
};

const DisplayConnectedAccount = () => {
  return <div></div>;
};

export default ConnectedAccount;
