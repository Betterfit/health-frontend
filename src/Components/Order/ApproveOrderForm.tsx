import { MenuItem, TextField } from "@material-ui/core";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import PrettyLink from "Components/Content/PrettyLink";
import FacilitySelector from "Components/FacilitySelector";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import BackNavigation from "Components/Helpers/BackNavigation";
import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";
import { api, parseException } from "Helpers/typedAPI";
import { formatCurrency } from "Helpers/utils";
import { useOrder } from "Models/orders";
import { usePaymentMethods } from "Models/paymentMethods";
import { productDisplayName } from "Models/products";
import AddFacilityForm from "Pages/AccountManagement/AddFacilityForm";
import { AddPaymentMethod } from "Pages/AccountManagement/PaymentMethods";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import { Money, PaymentMethod } from "Types";
import styles from "./ApproveOrderForm.module.css";

export interface InvoiceItem {
  name: string;
  quantity?: number;
  cost: number;
}

const ApproveOrderForm = ({
  orderId,
  onSuccess,
  onCancel,
}: {
  orderId: number;
  onSuccess?: () => void;
  onCancel: () => void;
}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const invoiceQuery = useQuery(["invoice"], () =>
    api.getOrderInvoice(orderId)
  );
  const { data: invoice } = invoiceQuery;
  // users can open forms to add a payment method or destination in the checkout flow.
  const [openForm, setOpenForm] = useState<"paymentMethod" | "facility" | null>(
    null
  );
  const destinationId = useAppSelector((state) => state.cart.destinationId);
  const orderQuery = useOrder(orderId);
  const order = orderQuery.data;
  const { data } = usePaymentMethods();
  const paymentMethods = data ?? [];
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const queryClient = useQueryClient();
  // We'll update our cart immediately for responsiveness
  const updateDestinationMutation = useMutation(
    async (facility: number) => {
      return api.editOrder(orderId, {
        facility,
      });
    },
    {
      onSuccess: (updatedOrder) => {
        dispatch(cartActions.importOrder(updatedOrder));
        orderQuery.refetch();
      },
    }
  );
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
        queryClient.invalidateQueries(["pricing"]);
        dispatch(cartActions.setOrderId(undefined));
      },
    }
  );

  if (openForm)
    return (
      <div className={styles.dialog}>
        <BackNavigation
          link="Go Back"
          onClickOverride={() => setOpenForm(null)}
        />
        {openForm === "paymentMethod" ? (
          <>
            <h2>Add New Payment Method</h2>
            <AddPaymentMethod
              onSuccess={() => {
                setOpenForm(null);
              }}
              extraClasses="w-full flex-1"
            />
          </>
        ) : (
          <>
            <h2>Add Destination Facility</h2>
            <AddFacilityForm
              handleClose={(facility) => {
                setOpenForm(null);
                facility && updateDestinationMutation.mutate(facility.id);
              }}
            />
          </>
        )}
      </div>
    );
  const error = parseException(approveOrderMutation.error);
  return (
    <div className={styles.dialog}>
      <h2>Approve and Pay for Order</h2>
      {/* {(!invoice ||
        !order ||
        approveOrderMutation.isLoading ||
        updateDestinationMutation.isLoading) && <LoadingSpinner darkened />} */}
      <LoadingSpinner
        show={
          !invoice ||
          !order ||
          approveOrderMutation.isLoading ||
          updateDestinationMutation.isLoading
        }
        darkened
      />
      {invoice && order && (
        <>
          {invoice.items.map((item) => {
            const orderProduct = order.orderProducts.find(
              (orderProduct) => orderProduct.id === item.orderProductId
            );
            return (
              <HorizontalDetail
                label={
                  productDisplayName(orderProduct?.productOption) +
                  ` (x${orderProduct?.quantity})`
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
          <FacilitySelector
            label="Destination"
            facilityId={destinationId}
            selectFacility={(facilityId) =>
              facilityId &&
              facilityId !== order.facility.id &&
              updateDestinationMutation.mutate(facilityId)
            }
            addNewFacility={() => setOpenForm("facility")}
          />
          <div className="flex flex-col item-center text-center text-base">
            <p>{order.facility.street}</p>
            <p>
              {order.facility.city}, {order.facility.province}{" "}
              {order.facility.postalCode?.toUpperCase()}
            </p>
          </div>
        </>
      )}
      <hr className="my-4" />
      <TextField
        className={styles.paymentMethod}
        value={paymentMethod?.id}
        id="selectPaymentMethod"
        label="Payment Method"
        variant="outlined"
        size="small"
        select
        fullWidth
        error={error?.code === "card_declined"}
        helperText={
          error?.code === "card_declined"
            ? "Payment method was declined"
            : undefined
        }
        onChange={(e) => {
          // One of the options will be to add a new payment method
          if (e.target.value === "new") {
            return setOpenForm("paymentMethod");
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
            + Add New Payment Method +
          </MenuItem>,
        ]}
      </TextField>
      <p className="mt-2">
        By placing an order you agree to our{" "}
        <PrettyLink
          to="https://betterfit.com/wp-content/uploads/Sale_of_Goods_Terms_E9282035.pdf"
          text="terms of sale"
        />
        .
      </p>
      <div className={styles.actions}>
        <PrettyButton text="Cancel" color="red" onClick={onCancel} />
        <PrettyButton
          text="Confirm"
          color="green"
          disabled={
            !paymentMethod ||
            invoice == null ||
            approveOrderMutation.isLoading ||
            destinationId == null
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
  if (percentage) label += ` (${percentage.toFixed(0)}%)`;
  return (
    <HorizontalDetail
      labelClass="normal-case"
      fullWidth
      label={label}
      value={formatCurrency(cost.amount)}
    />
  );
};

export default ApproveOrderForm;
