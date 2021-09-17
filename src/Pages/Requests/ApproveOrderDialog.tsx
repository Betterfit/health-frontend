import { Dialog, MenuItem, TextField } from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";
import { keyBy } from "lodash";
import { usePaymentMethods } from "Models/paymentMethods";
import { productDisplayName } from "Models/products";
import React, { useState } from "react";
import {
  Money,
  OrderInvoice,
  OrderProduct,
  PaymentMethod,
  ProductInvoice,
} from "Types";
import styles from "./ApproveOrderDialog.module.css";
import { formatCurrency } from "./RequestsPage";

export interface InvoiceItem {
  name: string;
  quantity?: number;
  cost: number;
}

type ApproveOrderDialogProps = {};
const ApproveOrderDialog = ({
  orderProducts,
  handleClose,
  invoice,
  approveOrder,
}: {
  orderProducts: OrderProduct[];
  handleClose: () => void;
  invoice: OrderInvoice;
  approveOrder: (pm: PaymentMethod, total: number) => void;
}) => {
  const { data } = usePaymentMethods();
  const paymentMethods = data ?? [];
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const orderProductsById = keyBy(orderProducts, "id");
  return (
    <Dialog open onClose={handleClose}>
      <div className={styles.dialog}>
        <p>Approve and Pay for Order</p>
        {invoice?.items.map((item) => {
          const orderProduct = orderProductsById[item.orderProductId];
          return (
            <HorizontalDetail
              label={
                productDisplayName(orderProduct.productOption) +
                ` (x${orderProduct.quantity})`
              }
              labelClass="normal-case"
              // label={item.productId + (item.quantity && ` (${item.quantity})`)}
              value={formatCurrency(item.baseTotal.amount)}
              fullWidth
            />
          );
        })}
        <FeeLineItem
          name={invoice.taxName}
          percentage={invoice.taxRate * 100}
          cost={invoice.taxes}
        />
        <FeeLineItem name="SupplyNet Fee" cost={invoice.applicationFee} />

        <hr />
        <HorizontalDetail
          label="Total"
          value={formatCurrency(invoice.total.amount)}
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
          <PrettyButton
            text="Confirm"
            color="green"
            disabled={!paymentMethod}
            onClick={() =>
              paymentMethod && approveOrder(paymentMethod, invoice.total.amount)
            }
          />
        </div>
      </div>
    </Dialog>
  );
};

const ProductLineItem = ({
  item,
  orderProducts,
}: {
  item: ProductInvoice;
  orderProducts: OrderProduct[];
}) => {};

const FeeLineItem = ({
  name,
  percentage,
  cost,
}: {
  name: string;
  percentage?: number;
  cost: Money;
}) => {
  let label = name;
  if (percentage) label += ` (${percentage}%)`;
  return (
    <HorizontalDetail
      labelClass="normal-case"
      fullWidth
      label={label}
      value={formatCurrency(cost.amount)}
    />
  );
};

export default ApproveOrderDialog;
