import { MenuItem, TextField } from "@material-ui/core";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import BackNavigation from "Components/Helpers/BackNavigation";
import {
  HorizontalDetail,
  VerticalDetail,
} from "Components/InfoDisplay/LabeledDetails";
import { api } from "Helpers/typedAPI";
import { keyBy } from "lodash";
import { useOrder } from "Models/orders";
import { usePaymentMethods } from "Models/paymentMethods";
import { productDisplayName } from "Models/products";
import { AddPaymentMethod } from "Pages/AccountManagement/PaymentMethods";
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
  // users can open up a form to add a payment method in the checkout flow
  const [paymentMethodForm, setPaymentMethodForm] = useState(false);
  const { data: order } = useOrder(orderId);
  const { data } = usePaymentMethods();
  const paymentMethods = data ?? [];
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
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
  if (paymentMethodForm)
    return (
      <div className={styles.dialog}>
        <BackNavigation
          link="Go Back"
          onClickOverride={() => setPaymentMethodForm(false)}
        />
        <h2>Add New Payment Method</h2>
        <AddPaymentMethod
          onSuccess={() => setPaymentMethodForm(false)}
          extraClasses="w-full flex-1"
        />
      </div>
    );
  return (
    <div className={styles.dialog}>
      <h2>Approve and Pay for Order</h2>
      <LoadingSpinner
        show={!invoice || !order || approveOrderMutation.isLoading}
        darkened
      />
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
          {/* allow users to change the facility here in the future */}
          {/*  <TextField
            value={order.facility.id}
            className="mb-2"
            id="destinationSelect"
            label="Destination"
            variant="outlined"
            size="small"
            select
            fullWidth
            disabled
          >
            {userFacilities?.map((facility) => (
              <MenuItem key={facility.id} value={facility.id}>
                {facility.name}
              </MenuItem>
            ))}
          </TextField> */}
          <VerticalDetail
            label="Destination"
            value={
              <div className="flex flex-col item-center text-center">
                <p>{order.facility.name}</p>
                <p>{order.facility.shippingStreet}</p>
                <p>
                  {order.facility.shippingCity},{" "}
                  {order.facility.shippingProvince}
                </p>
              </div>
            }
          />
        </>
      )}
      <TextField
        className={styles.paymentMethod}
        value={paymentMethod?.id}
        id="selectPaymentMethod"
        label="Payment Method"
        variant="outlined"
        size="small"
        select
        fullWidth
        onChange={(e) => {
          // One of the options will be to add a new payment method
          if (e.target.value === "new") {
            return setPaymentMethodForm(true);
          }
          const id = parseInt(e.target.value);
          setPaymentMethod(paymentMethods.find((pm) => pm.id === id) ?? null);
        }}
      >
        {[
          ...paymentMethods.map((pm) => (
            <MenuItem key={pm.id} value={pm.id}>
              {pm.name}
            </MenuItem>
          )),
          <MenuItem key="newPaymentMethod" value="new">
            - Add New Payment Method -
          </MenuItem>,
        ]}
      </TextField>
      <div className={styles.actions}>
        <PrettyButton text="Cancel" color="red" onClick={onCancel} />
        <PrettyButton
          text="Confirm"
          color="green"
          disabled={
            (!paymentMethod && invoice != null) ||
            approveOrderMutation.isLoading
          }
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
