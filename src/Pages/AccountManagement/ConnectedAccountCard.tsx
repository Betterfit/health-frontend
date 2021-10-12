import PrettyLink from "Components/Content/PrettyLink";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import {
  HorizontalDetail,
  VerticalDetail,
} from "Components/InfoDisplay/LabeledDetails";
import { api } from "Helpers/typedAPI";
import { useMyProfile } from "Models/user";
import { formatCurrency } from "Pages/Requests/RequestsPage";
import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { ConnectedAccount } from "Types";
import styles from "./ConnectedAccountCard.module.css";

const ConnectedAccountCard = () => {
  const { data: myProfile } = useMyProfile();
  useStripeRedirectWatcher();
  const connectedAccountQuery = useQuery<ConnectedAccount | undefined>(
    "connectedAccount",
    () => api.getConnectedAccounts().then((resp) => resp.data[0]),
    { enabled: myProfile?.isOrganizationAdmin }
  );

  // only organization admin can access this
  if (myProfile && !myProfile.isOrganizationAdmin) return <></>;
  let content = null;
  if (connectedAccountQuery.isSuccess) {
    const { data: connectedAccount } = connectedAccountQuery;
    content = connectedAccount?.setUpComplete ? (
      <CompleteConnectedAccount connectedAccount={connectedAccount} />
    ) : (
      <IncompleteConnectedAccount />
    );
  }

  return (
    <div className={styles.root}>
      <p className={styles.cardTitle}>Pay Out Account</p>
      {content}
    </div>
  );
};

/**
 * Watches for url arguments that would indicate the user has been redirected
 * from the stripe Connected Account set up flow.
 */
const useStripeRedirectWatcher = () => {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { search } = history.location;
  useEffect(() => {
    console.log(search);
    // https://stripe.com/docs/api/account_links/create#create_account_link-refresh_url
    if (search.includes("connected-account-setup=return"))
      api.completeConnectedAccountSetup().then(() => {
        // clear url and refetch connected account
        history.replace({ ...history.location, search: "" });
        queryClient.invalidateQueries("connectedAccount");
      });
    // https://stripe.com/docs/api/account_links/create#create_account_link-refresh_url
    else if (search.includes("connected-account-setup=refresh"))
      setUpConnectedAccount();
  }, [search, history, queryClient]);
};
const setUpConnectedAccount = async () => {
  const resp = await api.setupConnectedAccount();
  const url = resp.data.url;
  window.open(url);
};

const IncompleteConnectedAccount = () => {
  const setUpMutation = useMutation(setUpConnectedAccount);
  return (
    <>
      <p>
        We've integrated with Stripe to facilitate rapid and hassle free
        payouts.
      </p>
      <p>
        Before you can start fulfilling orders, you will need to create a Stripe
        Connected Account in order to receive payments from purchasers.
      </p>
      <PrettyButton
        text="Setup Connected Account"
        className="mt-2"
        onClick={setUpMutation.mutate}
        disabled={setUpMutation.isLoading}
      />
    </>
  );
};

const CompleteConnectedAccount = ({
  connectedAccount,
}: {
  connectedAccount: ConnectedAccount;
}) => {
  const { stripeInfo, balance } = connectedAccount;
  const bankAccount = stripeInfo.bankAccounts[0];
  return (
    <>
      <div className={styles.balances}>
        <VerticalDetail
          label="Balance"
          value={formatCurrency(
            balance.available.amount + balance.pending.amount
          )}
        />
      </div>
      <div>
        <HorizontalDetail label="Bank Name" value={bankAccount.bankName} />
        <HorizontalDetail
          label="Routing Number"
          value={bankAccount.routingNumber}
        />
        <HorizontalDetail
          label="Account Number"
          value={`*******${bankAccount.last4}`}
        />
      </div>
      <PrettyLink
        to="https://dashboard.stripe.com"
        text="Open Stripe Dashboard"
      />
    </>
  );
};

export default ConnectedAccountCard;
