import { TextField } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMyProfile } from "APIHooks/user";
import AdminTabs from "Components/Content/AdminTabs";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { api } from "Helpers/typedAPI";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { CreditCardPaymentMethod } from "Types";
import PaymentMethodDetail from "./PaymentMethodDetail";
import styles from "./PaymentMethods.module.css";

const PaymentMethods = () => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <AdminTabs
      tabs={[
        {
          header: "My Payment Methods",
          content: <PaymentMethodList />,
        },
        {
          header: "Add Payment Method",
          icon: "add",
          content: <AddPaymentMethod onSuccess={() => setTabIndex(0)} />,
        },
      ]}
      selectedIndex={tabIndex}
      setSelectedIndex={setTabIndex}
      ariaLabel="Payment Methods"
    />
  );
};

const PaymentMethodList = () => {
  const paymentMethods = [
    {
      id: 2,
      name: "Emergency Expenses",
      owner: { firstName: "Amy", lastName: "Wu", id: 5 },
    },
    {
      id: 3,
      name: "Psych Ward",
      owner: { firstName: "Kevin", lastName: "Waters", id: 2 },
    },
  ];
  return (
    <div className={styles.paymentMethods}>
      <p className={styles.paymentMethodTypeTitle}>Credit Cards</p>
      <ul className={styles.paymentMethods}>
        {paymentMethods.map((paymentMethod) => (
          <PaymentMethodListItem
            paymentMethod={paymentMethod as CreditCardPaymentMethod}
          />
        ))}
      </ul>
    </div>
  );
};

const PaymentMethodListItem = ({
  paymentMethod,
}: {
  paymentMethod: CreditCardPaymentMethod;
}) => {
  const [open, setOpen] = useState(false);
  const { data: myProfile } = useMyProfile();
  const ownedByMe = myProfile?.id === paymentMethod.owner.id;
  return (
    <>
      {open && (
        <PaymentMethodDetail
          onClose={() => setOpen(false)}
          {...{ ownedByMe, paymentMethod }}
        />
      )}
      <li className={styles.paymentMethod} onClick={() => setOpen(true)}>
        <button>{paymentMethod.name}</button>
        {ownedByMe && <span>Owner</span>}
      </li>
    </>
  );
};

const AddPaymentMethod = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState({
    paymentMethodName: "",
    cardHolderName: "",
  });
  // const [error, setError] = useState({})
  // https://stripe.com/docs/stripe-js/react#usestripe-hook
  const stripe = useStripe();
  const elements = useElements();
  const stripeHasLoaded = stripe && elements;
  const { data: myProfile } = useMyProfile();

  const setupStripeMutation = useMutation(async () => {
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const setupIntent = await api
      .getSetupPaymentIntent()
      .then((response) => response.data);
    console.log(setupIntent);
    const { clientSecret } = setupIntent;
    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement!,
        billing_details: { name: formData.cardHolderName },
      },
    });
    if (result.error) {
      console.log("[error]", result.error);
      return;
    } else {
      console.log("[PaymentMethod]", result.setupIntent);
    }

    api
      .addPaymentMethod({
        authorizedUsers: [],
        name: formData.paymentMethodName,
        owner: myProfile!.id,
        stripeId: result.setupIntent.id,
      })
      .then(onSuccess);
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!setupStripeMutation.isLoading) setupStripeMutation.mutate();
  };

  return (
    <form className={styles.addPayment} onSubmit={handleSubmit}>
      <LoadingSpinner darkened show={setupStripeMutation.isLoading} />
      <TextField
        value={formData.paymentMethodName}
        onChange={(e) =>
          setFormData({ ...formData, paymentMethodName: e.target.value })
        }
        variant="outlined"
        label="Payment Method Name"
        placeholder="eg Emergency Credit Card"
        size="small"
        helperText="A nickname to help identify this card"
        required
        fullWidth
      />
      <TextField
        value={formData.cardHolderName}
        onChange={(e) =>
          setFormData({ ...formData, cardHolderName: e.target.value })
        }
        variant="outlined"
        label="Card Holder Name"
        size="small"
        required
        fullWidth
      />
      <CardElement
        options={{
          classes: { base: styles.stripeCard },
          style: { base: { fontSize: "18px", backgroundColor: "transparent" } },
        }}
      />
      <PrettyButton
        text="Save Card"
        disabled={!stripeHasLoaded || setupStripeMutation.isLoading}
        type="submit"
      />
    </form>
  );
};

export default PaymentMethods;
