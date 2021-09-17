import { MenuItem, TextField } from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { VerticalDetail } from "Components/InfoDisplay/LabeledDetails";
import { api } from "Helpers/typedAPI";
import { productDisplayName } from "Models/products";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { SupplierTicket } from "Types";
import styles from "./MarkShippedForm.module.css";

const MarkShippedDialog = ({
  ticket,
  onClose,
}: {
  ticket: SupplierTicket;
  onClose: () => void;
}) => {
  const product = ticket.orderProduct.productOption;
  const { destination, orderProduct } = ticket;
  const [formData, setFormData] = useState({
    shippingProvider: "",
    trackingNumber: "",
  });
  const queryClient = useQueryClient();
  const ticketMutation = useMutation(
    () => api.updateTicket(ticket, { status: "shipped", ...formData }),
    {
      onSuccess: () => {
        onClose();
        queryClient.invalidateQueries("tickets");
      },
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
      <p className={styles.title}>Mark Ticket #{ticket.id} as Shipped</p>
      <hr />
      <VerticalDetail label="Destination" value={destination.name} />
      <VerticalDetail label="Product" value={productDisplayName(product)} />
      <VerticalDetail label={product.optionLabel} value={product.name} />
      <VerticalDetail label="Quantity" value={orderProduct.quantity} />
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
        <PrettyButton text="Cancel" color="red" onClick={onClose} />
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
export default MarkShippedDialog;
