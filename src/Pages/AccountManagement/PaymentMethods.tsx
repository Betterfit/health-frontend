import { TextField } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import AdminTabs from "Components/Content/AdminTabs";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { api } from "Helpers/typedAPI";
import React, { useState } from "react";
import { useMutation } from "react-query";
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
  return (
    <ul>
      <li>Visa xxxxxxxxxx 1234</li>
      <li>Visa xxxxxxxxxx 1234</li>
    </ul>
  );
};

const AddPaymentMethod = ({ onSuccess }: { onSuccess: () => void }) => {
  // https://stripe.com/docs/stripe-js/react#usestripe-hook
  const [formData, setFormData] = useState({
    paymentMethodName: "",
    cardHolderName: "",
  });
  const stripe = useStripe();
  const elements = useElements();
  const stripeHasLoaded = stripe && elements;
  // stripe?.createPaymentMethod()
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
    } else {
      console.log("[PaymentMethod]", result.setupIntent);
      onSuccess();
    }
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (setupStripeMutation.isIdle) setupStripeMutation.mutate();
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

const stripeCardOptions = {
  classes: { base: styles.stripeCard },
  style: { base: { fontSize: "18px" } },
};

export default PaymentMethods;
