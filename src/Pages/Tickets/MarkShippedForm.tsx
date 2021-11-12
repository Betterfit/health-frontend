import { MenuItem, TextField } from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { VerticalDetail } from "Components/InfoDisplay/LabeledDetails";
import { api } from "Helpers/typedAPI";
import { productDisplayName } from "Models/products";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { Ticket } from "Types";
import styles from "./MarkShippedForm.module.css";

const MarkShippedForm = ({
  ticket,
  onSuccess,
  onCancel,
}: {
  ticket: Ticket;
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const product = ticket.productOption;
  const { destination } = ticket;
  const [formData, setFormData] = useState({
    shippingProvider: "",
    trackingNumber: "",
  });
  const ticketMutation = useMutation(
    () => api.updateTicket(ticket, { status: "shipped", ...formData }),
    {
      onSuccess: onSuccess,
    }
  );

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        ticketMutation.mutate();
      }}
    >
      <h2>Mark Ticket #{ticket.id} as Shipped</h2>
      <hr />
      <VerticalDetail label="Destination" value={destination.name} />
      <VerticalDetail label="Product" value={productDisplayName(product)} />
      <VerticalDetail label={product.optionLabel} value={product.name} />
      <VerticalDetail label="Quantity" value={ticket.quantity} />
      <hr />
      <p>Shipping Information (Optional)</p>
      <TextField
        value={formData.shippingProvider}
        id="shippingProviderInput"
        label="Shipping Provider"
        variant="outlined"
        size="small"
        select
        fullWidth
        onChange={(e) =>
          setFormData({ ...formData, shippingProvider: e.target.value })
        }
      >
        {["UPS", "Fedex", "Canada Post", "Purolator"].map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        className="mt-2"
        value={formData.trackingNumber}
        onChange={(e) =>
          setFormData({ ...formData, trackingNumber: e.target.value })
        }
        id="trackingNumberInput"
        label="Tracking Number"
        fullWidth
        variant="outlined"
        size="small"
      />
      <hr />
      <div className={styles.actions}>
        <PrettyButton text="Cancel" color="red" onClick={onCancel} />
        <PrettyButton
          text="Confirm"
          color="green"
          type="submit"
          disabled={ticketMutation.isLoading}
        />
      </div>
    </form>
  );
};
export default MarkShippedForm;
