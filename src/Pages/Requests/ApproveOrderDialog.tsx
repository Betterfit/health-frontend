import { Dialog, MenuItem, TextField } from "@material-ui/core";
import { usePaymentMethods } from "APIHooks/paymentMethods";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";
import React, { useState } from "react";
import { CreditCardPaymentMethod } from "Types";
import styles from "./ApproveOrderDialog.module.css";
import { formatCurrency } from "./RequestsPage";

export interface InvoiceItem {
  name: string;
  quantity?: number;
  cost: number;
}
const ApproveOrderDialog = ({
  open,
  handleClose,
  itemizedInvoice,
  total,
}: {
  open: boolean;
  handleClose: () => void;
  itemizedInvoice: InvoiceItem[];
  total: number;
}) => {
  const { data, isLoading } = usePaymentMethods();
  const paymentMethods = data ?? [];
  const [paymentMethod, setPaymentMethod] = useState<CreditCardPaymentMethod>();
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className={styles.dialog}>
        <p>Approve and Pay for Order</p>
        {itemizedInvoice.map((item) => (
          <HorizontalDetail
            label={item.name + (item.quantity && ` (${item.quantity})`)}
            value={formatCurrency(item.cost)}
            fullWidth
          />
        ))}
        <hr />
        <HorizontalDetail
          label="Total"
          value={formatCurrency(total)}
          fullWidth
        />
        <TextField
          value={paymentMethod?.id}
          id="selectPaymentMethod"
          label="Payment Method"
          variant="outlined"
          size="small"
          select
          fullWidth
          onChange={(e) => {
            const id = parseInt(e.target.value);
            setPaymentMethod(paymentMethods.find((pm) => pm.id === id));
          }}
        >
          {paymentMethods.map((pm) => (
            <MenuItem key={pm.id} value={pm.id}>
              {pm.name}
            </MenuItem>
          ))}
        </TextField>
        <div className={styles.actions}>
          <PrettyButton text="Cancel" color="red" onClick={handleClose} />
          <PrettyButton text="Confirm" color="green" />
        </div>
      </div>
    </Dialog>
  );
};

export default ApproveOrderDialog;
