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
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import AddFacilityForm from "Routes/AccountManagement/AddFacilityForm";
import { AddPaymentMethod } from "Routes/AccountManagement/PaymentMethods";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import { Money, PaymentMethod } from "Types";
import styles from "./ApproveOrderForm.module.css";
import ProductImage from "Components/Product/ProductImage";
import clsx from "clsx";

export interface AvailableInventoryProduct {
  name: string;
  orderProductId: string;
  productOptionId: string;
  quantity: string;
}

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
  const invoiceQuery = useQuery(
    ["invoice"],
    () => api.getOrderInvoice(orderId),
    { retry: false }
  );
  const { data: invoice } = invoiceQuery;
  const shippingRate = (): Money => {
    const currency = "CAD";
    let shippingAmount = 0;

    if (invoice?.items) {
      for (let item of invoice?.items) {
        shippingAmount += item.shipping.amount;
      }
    }

    return {
      amount: shippingAmount,
      currency,
    };
  };
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
        // TODO: Ask question about it!
        // dispatch(cartActions.setOrderId(undefined));
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

  if (invoice?.code === "invalid_order_products") {
    const limitedStockProducts: any = [];

    order?.orderProducts.forEach((orderProduct) => {
      invoice.inventory.forEach(
        (availableProduct: AvailableInventoryProduct) => {
          if (availableProduct.orderProductId === orderProduct.id.toString())
            limitedStockProducts.push({
              ...orderProduct,
              availableQuantity: availableProduct.quantity,
            });
        }
      );
    });

    return (
      <>
        <div className="flex md:flex-col p-4">
          <h1 className="text-xl text-center font-semibold text-betterfit-graphite mb-4">
            Limited Stock
          </h1>
          {limitedStockProducts?.map((product: any) => (
            <>
              <hr />
              <div className="flex md:flex-row px-4">
                <ProductImage
                  product={product.productOption}
                  className={clsx(
                    "h-20 w-20 md:h-32 md:w-32 pt-3 pr-3 object-contain"
                    // outOfStock && styles.outOfStock
                  )}
                />
                <div className="flex-col pt-7">
                  <h1
                    className={
                      "text-base font-semibold text-betterfit-graphite"
                    }
                  >
                    {product.productOption?.product}
                  </h1>
                  <span className="text-betterfit-grey-blue text-md">
                    {product.productOption?.name
                      ? product.productOption.name
                      : "N/A"}
                  </span>
                  <HorizontalDetail
                    label="Available Quantity"
                    value={product.availableQuantity}
                  />
                </div>
              </div>
            </>
          ))}
          <span className="text-xs text-red-500">
            * Some of of product are limited or out stock. Change the selected
            quantity in your cart.
          </span>
        </div>
      </>
    );
  }

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
          {invoice.items.map((item: any) => {
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
          <FeeLineItem name="Supply Net Fee" cost={invoice.applicationFee} />
          <FeeLineItem name="Shipping Fee" cost={shippingRate()} />
          {/* Showing applied credits only when non-zero amount is applied */}
          {invoice.appliedCredit.amount !== 0 && (
            <FeeLineItem
              name="Credits Applied"
              cost={invoice.appliedCredit}
              credit
            />
          )}
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
        value={paymentMethod?.id ?? ""}
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
  credit,
}: {
  name: string;
  percentage?: number;
  cost: Money;
  credit?: boolean;
}) => {
  let label = name;
  if (percentage) label += ` (${percentage.toFixed(0)}%)`;
  return (
    <HorizontalDetail
      labelClass="normal-case"
      fullWidth
      label={label}
      value={formatCurrency(cost.amount)}
      valueClass={!!credit ? "text-green-600" : ""}
    />
  );
};

export const EnterDestinationForm = ({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => void;
  onCancel: () => void;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.dialog}>
      <h2>Add Destination Facility</h2>
      <AddFacilityForm
        handleClose={(facility) => {
          if (facility != null) {
            dispatch(cartActions.setDestinationId(facility.id));
            onSuccess();
          } else onCancel();
        }}
      />
    </div>
  );
};

export default ApproveOrderForm;
