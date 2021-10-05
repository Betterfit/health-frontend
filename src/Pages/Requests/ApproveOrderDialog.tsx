import { MenuItem, TextField } from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";
import { api } from "Helpers/typedAPI";
import { keyBy } from "lodash";
import { useOrder } from "Models/orders";
import { usePaymentMethods } from "Models/paymentMethods";
import { productDisplayName } from "Models/products";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { Money, PaymentMethod } from "Types";
import styles from "./ApproveOrderDialog.module.css";
import { formatCurrency } from "./RequestsPage";

export interface InvoiceItem {
  name: string;
  quantity?: number;
  cost: number;
}

const ApproveOrderDialog = ({
  orderId,
  onSuccess,
  onCancel,
}: {
  orderId: number;
  onSuccess?: () => void;
  onCancel: () => void;
}) => {
  const history = useHistory();
  const { data: invoice } = useQuery(["invoice"], () =>
    api.getOrderInvoice(orderId).then((response) => response.data)
  );
  const { data: order } = useOrder(orderId);
  const { data } = usePaymentMethods();
  const paymentMethods = data ?? [];
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();
  const queryClient = useQueryClient();
  const approveOrderMutation = useMutation(
    () =>
      api.updateOrderStatus({
        orderId,
        action: "approve",
        data: {
          paymentMethodId: paymentMethod!.id,
          total: invoice!.total.amount,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["orders"]);
        if (onSuccess) onSuccess();
        history.push(`/dashboard/orders/detail/${orderId}`);
      },
      onError: () => {
        alert("Payment could not be processed.");
        queryClient.invalidateQueries(["pricing"]);
      },
    }
  );
  const orderProductsById = order ? keyBy(order.orderProducts, "id") : {};
  return (
    <div className={styles.dialog}>
      <h2>Approve and Pay for Order</h2>
      {invoice && order && (
        <>
          {invoice.items.map((item) => {
            const orderProduct = orderProductsById[item.orderProductId];
            return (
              <HorizontalDetail
                label={
                  productDisplayName(orderProduct.productOption) +
                  ` (x${orderProduct.quantity})`
                }
                labelClass="normal-case"
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
        </>
      )}
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
        <PrettyButton text="Cancel" color="red" onClick={onCancel} />
        <PrettyButton
          text="Confirm"
          color="green"
          disabled={!paymentMethod && invoice != null}
          onClick={approveOrderMutation.mutate}
        />
      </div>
    </div>
  );
};

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
