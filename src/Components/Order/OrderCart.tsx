import { AxiosError } from "axios";
import Dialog from "Components/Dialog";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import ApproveOrderForm, {
  EnterDestinationForm,
} from "Components/Order/ApproveOrderForm";
import SignUpPrompt from "Components/SignUpPrompt";
import { api } from "Helpers/typedAPI";
import { useOrder } from "Models/orders";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import CartItemList from "./CartItemList";

const OrderCart = () => {
  const dispatch = useAppDispatch();
  const orderId = useAppSelector((state) => state.cart.orderId);
  const { data: oldOrder } = useOrder(orderId ?? 0, {
    enabled: orderId != null,
  });
  useEffect(() => {
    if (oldOrder?.status === "approved" || oldOrder?.status === "delivered")
      dispatch(cartActions.clearCart());
  }, [oldOrder, dispatch]);
  const [dialogOpen, setDialogOpen] = useState<
    null | "destination" | "approve" | "signup"
  >(null);

  return (
    <>
      <div
        className="flex-grow flex flex-col overflow-hidden"
        aria-label="cart"
        role="complementary"
      >
        <CartItemList />
      </div>
      <CartActions openDialog={setDialogOpen} />
      <Dialog open={dialogOpen != null} onClose={() => setDialogOpen(null)}>
        {dialogOpen === "approve" && (
          <ApproveOrderForm
            orderId={orderId!}
            onCancel={() => setDialogOpen(null)}
            onSuccess={() => dispatch(cartActions.clearCart())}
          />
        )}
        {dialogOpen === "destination" && (
          <EnterDestinationForm
            onCancel={() => setDialogOpen(null)}
            onSuccess={() => setDialogOpen(null)}
          />
        )}
        {dialogOpen === "signup" && <SignUpPrompt />}
      </Dialog>
    </>
  );
};

const useOrderMutation = (options: {
  onSuccess: () => void;
  onError: (err: AxiosError) => void;
}) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const destinationId = useAppSelector((state) => state.cart.destinationId);
  const orderId = useAppSelector((state) => state.cart.orderId);

  return useMutation(
    async (status: "draft" | "open") => {
      const orderData = {
        facility: destinationId!,
        status: status,
        orderProducts: cartItems.map((item) => ({
          quantity: item.quantity,
          productOption: item.productOptionId,
        })),
      };

      const order = await (orderId
        ? api.editOrder(orderId, orderData)
        : api.createOrder(orderData));
      queryClient.invalidateQueries("orders");
      queryClient.invalidateQueries("invoice");
      if (status === "draft") {
        history.push(`/dashboard/orders/detail/${order.id}`);
        dispatch(cartActions.clearCart());
      } else {
        dispatch(cartActions.importOrder(order));
      }
    },
    { ...options }
  );
};

const CartActions = ({
  openDialog,
}: {
  openDialog: (dialog: "approve" | "destination" | "signup") => void;
}) => {
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const destinationId = useAppSelector((state) => state.cart.destinationId);
  const loggedIn = useAppSelector((state) => state.preferences.loggedIn);

  const orderMutation = useOrderMutation({
    onSuccess: () => openDialog("approve"),
    onError: (e: AxiosError) => {
      if (e?.response?.status === 404)
        dispatch(cartActions.setOrderId(undefined));
      console.log(e);
    },
  });

  const emptyCart = cartItems.length === 0;
  const needsDestination = loggedIn && !destinationId;
  return (
    <div className="flex justify-around ">
      {loggedIn && (
        <PrettyButton
          text="Save Draft"
          variant="outline"
          onClick={() => orderMutation.mutate("draft")}
          className="flex-1 justify-center"
          disabled={emptyCart || needsDestination || orderMutation.isLoading}
        />
      )}
      <PrettyButton
        variant="outline"
        color="green"
        text={needsDestination ? "Select Destination" : "Place Order"}
        disabled={emptyCart || orderMutation.isLoading}
        className="flex-1 justify-center"
        onClick={() => {
          if (needsDestination) openDialog("destination");
          else if (!loggedIn) openDialog("signup");
          else orderMutation.mutate("open");
        }}
      />
    </div>
  );
};

export default OrderCart;
