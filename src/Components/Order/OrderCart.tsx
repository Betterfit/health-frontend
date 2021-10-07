import Dialog from "Components/Dialog";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { api } from "Helpers/typedAPI";
import ApproveOrderDialog from "Pages/Requests/ApproveOrderDialog";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import CartItemList from "./CartItemList";

const OrderCart = () => {
  const orderId = useAppSelector((state) => state.cart.orderId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

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
        <ApproveOrderDialog
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

  const orderMutation = useMutation(
    async (status: "draft" | "open") => {
      const orderData = {
        facility: destinationId!,
        status: status,
        orderProducts: cartItems.map((item) => ({
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
    { onSuccess: openDialog }
  );

  const priceRequest = cartItems.map(({ productOptionId, quantity }) => ({
    productOptionId,
    quantity,
    facilityId: destinationId,
  }));
  const priceQuery = useQuery(
    ["pricing", priceRequest],
    () => api.getPricing(priceRequest).then((response) => response.data),
    { enabled: destinationId != null }
  );
  const inStock =
    priceQuery.isSuccess &&
    priceQuery.data?.every(
      (orderProduct) => orderProduct.purchaseOptions.length > 0
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
        disabled={!readyToSubmit || orderMutation.isLoading || !inStock}
        className="flex-1 justify-center"
        onClick={() => orderMutation.mutate("open")}
      />
    </div>
  );
};

export default OrderCart;
