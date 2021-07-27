import { TextField } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import React, { useState } from "react";
import { AdminTab } from "./AccountManagement";
import styles from "./PaymentMethods.module.css";

const PaymentMethods = () => {
  const [addMethodOpen, setAddMethodOpen] = useState(true);
  return (
    <div className={styles.root}>
      <AdminTab
        text="Add Payment"
        open={addMethodOpen}
        setOpen={setAddMethodOpen}
      />
      <div className={styles.content}>
        {addMethodOpen ? <AddPaymentMethod /> : <PaymentMethodList />}
      </div>
    </div>
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

const AddPaymentMethod = () => {
  // https://stripe.com/docs/stripe-js/react#usestripe-hook
  const [formData, setFormData] = useState({
    paymentMethodName: "",
    cardHolderName: "",
  });
  const stripe = useStripe();
  const elements = useElements();
  const stripeHasLoaded = stripe && elements;
  // stripe?.createPaymentMethod()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
    });
    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <form className={styles.addPayment} onSubmit={handleSubmit}>
      {/* <LoadingSpinner /> */}
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
        helperText="The name that appears on bills"
        required
        fullWidth
      />

      <CardElement
        options={{
          classes: { base: styles.stripeCard },
          style: { base: { fontSize: "18px" } },
        }}
      />
      <PrettyButton
        text="Save Card"
        disabled={!stripeHasLoaded}
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
