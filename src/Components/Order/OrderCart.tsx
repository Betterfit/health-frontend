import { Dialog } from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import Translator from "Helpers/Translator";
import { api } from "Helpers/typedAPI";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import CartItemList from "./CartItemList";

/**
 * @param orderId Specify if updating and existing order
 */
const OrderCart = ({ orderId }: { orderId?: number }) => {
  const history = useHistory();
  const cart = useAppSelector((state) => state.cart);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const orderMutation = useMutation(
    async (status: "draft" | "open") => {
      const orderData = {
        facility: cart.destinationId!,
        status: status,
        orderProducts: cart.items.map((item) => ({
          quantity: item.quantity,
          productOption: item.productOptionId,
          autoSelectSupplier: true,
        })),
      };
      const order = await api.createOrder(orderData);
      console.log(order);
      queryClient.invalidateQueries("orders");
      if (status === "draft") {
        history.push(`/dashboard/orders/detail/${order.pk}`);
        dispatch(cartActions.clearCart());
      }
    },
    { onSuccess: () => setDialogOpen(true) }
  );
  const readyToSubmit = cart.destinationId && cart.items.length !== 0;

  return (
    <>
      <div
        className="flex-grow flex flex-col overflow-hidden"
        aria-label="cart"
        role="complementary"
      >
        <CartItemList />
      </div>
      <div className="flex justify-around ">
        <PrettyButton
          text="Save Draft"
          variant="outline"
          onClick={() => orderMutation.mutate("draft")}
          className="flex-1 justify-center"
          disabled={!readyToSubmit || orderMutation.isLoading}
        />
        <PrettyButton
          variant="outline"
          color="green"
          text="Submit Request"
          disabled={!readyToSubmit || orderMutation.isLoading}
          className="flex-1 justify-center"
          onClick={() => orderMutation.mutate("open")}
        />
      </div>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <ConfirmOrderForm />
      </Dialog>
    </>
  );
};

export default OrderCart;

const ConfirmOrderForm = () => {
  return (
    <>
      <div className="px-6 py-4 border-b border-gray-300">
        <h2 className="text-betterfit-navy text-xl">
          {Translator("Save as Draft")}
        </h2>
      </div>
      <div className="py-6 px-6">
        <p className="text-paragraph text-base">
          {Translator("Would you like to add a purchase order to it?")}
        </p>
      </div>
    </>
  );
};
