import Dialog from "Components/Dialog";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { api } from "Helpers/typedAPI";
import ApproveOrderDialog from "Pages/Requests/ApproveOrderDialog";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import CartItemList from "./CartItemList";

const OrderCart = () => {
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
      queryClient.invalidateQueries("orders");
      queryClient.invalidateQueries("invoice");
      if (status === "draft") {
        history.push(`/dashboard/orders/detail/${order.id}`);
        dispatch(cartActions.clearCart());
      } else {
        dispatch(cartActions.importOrder(order));
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
        <ApproveOrderDialog
          orderId={cart.orderId!}
          onCancel={() => setDialogOpen(false)}
          onSuccess={() => dispatch(cartActions.clearCart())}
        />
      </Dialog>
    </>
  );
};

export default OrderCart;
