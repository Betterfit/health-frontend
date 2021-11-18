import { AxiosError } from "axios";
import Dialog from "Components/Dialog";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import ApproveOrderForm from "Components/Order/ApproveOrderForm";
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
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div
        className="flex-grow flex flex-col overflow-hidden"
        aria-label="cart"
        role="complementary"
      >
        <CartItemList />
      </div>
      <CartActions openDialog={() => setDialogOpen(true)} />
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <ApproveOrderForm
          orderId={orderId!}
          onCancel={() => setDialogOpen(false)}
          onSuccess={() => dispatch(cartActions.clearCart())}
        />
      </Dialog>
    </>
  );
};

const CartActions = ({ openDialog }: { openDialog: () => void }) => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);
  const destinationId = useAppSelector((state) => state.cart.destinationId);
  const orderId = useAppSelector((state) => state.cart.orderId);

  const orderMutation = useMutation(
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
    {
      onSuccess: openDialog,
      onError: (e: AxiosError) => {
        if (e?.response?.status === 404)
          dispatch(cartActions.setOrderId(undefined));
        console.log(e);
      },
    }
  );

  const readyToSubmit = destinationId && cartItems.length !== 0;
  return (
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
        text="Place Order"
        disabled={!readyToSubmit || orderMutation.isLoading}
        className="flex-1 justify-center"
        onClick={() => orderMutation.mutate("open")}
      />
    </div>
  );
};

export default OrderCart;
