import { TextField } from "@material-ui/core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import clsx from "clsx";
import AdminTabs from "Components/Content/AdminTabs";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";
import { api } from "Helpers/typedAPI";
import { formatCurrency } from "Helpers/utils";
import { usePaymentMethods } from "Models/paymentMethods";
import { useMyProfile } from "Models/user";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { PaymentMethod } from "Types";
import PaymentMethodDetail from "./PaymentMethodDetail";
import styles from "./PaymentMethods.module.css";

const PaymentMethods = ({ credit }: { credit: string }) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div className="flex">
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
      <div className={clsx(styles.credits, "cardBorder ml-3")}>
        <p className={clsx(styles.paymentMethodTypeTitle, "text-center")}>
          Credits
        </p>
        <HorizontalDetail
          label="Balance"
          value={formatCurrency(Number(credit))}
        />
      </div>
    </div>
  );
};

const PaymentMethodList = () => {
  const { data, isLoading } = usePaymentMethods();
  const paymentMethods = data ?? [];

  return (
    <div className={styles.paymentMethods}>
      <LoadingSpinner darkened show={isLoading} />
      <p id="creditCardList" className={styles.paymentMethodTypeTitle}>
        Credit Cards
      </p>
      <ul aria-labelledby="creditCardList" className={styles.paymentMethods}>
        {paymentMethods.map((paymentMethod) => (
          <PaymentMethodListItem
            key={paymentMethod.id}
            paymentMethod={paymentMethod as PaymentMethod}
          />
        ))}
      </ul>
    </div>
  );
};

const PaymentMethodListItem = ({
  paymentMethod,
}: {
  paymentMethod: PaymentMethod;
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
      <li
        className={styles.paymentMethod}
        aria-label={paymentMethod.name}
        onClick={() => setOpen(true)}
      >
        <button>{paymentMethod.name}</button>
        {ownedByMe && <span>Owner</span>}
      </li>
    </>
  );
};

export const AddPaymentMethod = ({
  onSuccess,
  onCancel,
  extraClasses,
}: {
  onSuccess: () => void;
  onCancel?: () => void;
  extraClasses?: string;
}) => {
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

  const queryClient = useQueryClient();
  const addPaymentMethodMutation = useMutation(async () => {
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
    }
    const paymentMethodId = result.setupIntent.payment_method;
    if (!paymentMethodId) {
      console.log(result);
      return;
    }
    api
      .addPaymentMethod({
        authorizedUsers: [],
        name: formData.paymentMethodName,
        owner: myProfile!.id,
        stripeId: paymentMethodId,
      })
      .then(() => {
        queryClient.invalidateQueries("paymentMethods");
        onSuccess();
      });
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addPaymentMethodMutation.isLoading) addPaymentMethodMutation.mutate();
  };

  return (
    <form
      className={clsx(styles.addPayment, extraClasses)}
      onSubmit={handleSubmit}
    >
      <LoadingSpinner darkened show={addPaymentMethodMutation.isLoading} />
      <TextField
        value={formData.paymentMethodName}
        onChange={(e) =>
          setFormData({ ...formData, paymentMethodName: e.target.value })
        }
        variant="outlined"
        label="Payment Method Name"
        id="Payment Method Name"
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
        id="Card Holder Name"
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
        disabled={!stripeHasLoaded || addPaymentMethodMutation.isLoading}
        type="submit"
      />
      {onCancel && (
        <PrettyButton text="Cancel" color="red" onClick={onCancel} />
      )}
    </form>
  );
};

export default PaymentMethods;
