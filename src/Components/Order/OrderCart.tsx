import { AxiosError } from "axios";
// import clsx from "clsx";
import Dialog from "Components/Dialog";
import FacilitySelector from "Components/FacilitySelector";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import ApproveOrderForm, {
  EnterDestinationForm,
} from "Components/Order/ApproveOrderForm";
import SignUpPrompt from "Components/SignUpPrompt";
import { api } from "Helpers/typedAPI";
// import { useSelectedFacility } from "Models/facilities";
import { useOrder } from "Models/orders";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import CartItemList from "./CartItemList";
// import ProductImage from "Components/Product/ProductImage";
// import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";

const OrderCart = () => {
  const dispatch = useAppDispatch();
  const orderId = useAppSelector((state) => state.cart.orderId);
  const { data: oldOrder } = useOrder(orderId ?? 0, {
    enabled: orderId != null,
  });
  const destinationId = useAppSelector((state) => state.cart.destinationId);
  const setDestination = (facilityId?: number) =>
    dispatch(cartActions.setDestinationId(facilityId));
  useEffect(() => {
    if (oldOrder?.status === "approved" || oldOrder?.status === "delivered")
      dispatch(cartActions.clearCart());
  }, [oldOrder, dispatch]);
  const [dialogOpen, setDialogOpen] = useState<
    null | "destination" | "approve" | "signup" | "outOfStock"
  >(null);
  // const [outOfStockProducts, setOutOfStockProducts] = useState<any[]>([]);

  return (
    <>
      <div
        className="flex-grow flex flex-col overflow-hidden"
        aria-label="cart"
        role="complementary"
      >
        <div className="flex flex-col p-4 pb-2 border-b border-betterfit-grey border-opacity-40">
          <FacilitySelector
            label="Destination Facility"
            facilityId={destinationId}
            selectFacility={setDestination}
          />
          <CartActions
            openDialog={setDialogOpen}
            /* openOutOfStockList={(outOfStockProducts) => {
              setOutOfStockProducts(outOfStockProducts);
              setDialogOpen("outOfStock");
            }} */
          />
        </div>
        <CartItemList />
      </div>
      <Dialog open={dialogOpen != null} onClose={() => setDialogOpen(null)}>
        {/* {dialogOpen === "outOfStock" && (
          <div className="flex md:flex-col p-4">
            <h1 className="text-xl text-center font-semibold text-betterfit-graphite mb-4">
              Limited Stock
            </h1>
            {outOfStockProducts.map((product) => (
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
                      value={product.quantity}
                    />
                  </div>
                </div>
              </>
            ))} 
            <span className="text-xs text-red-500">
              *Some of of product are limited or out stock. Change the selected
              quantity in your cart.
            </span>
          </div>
        )}*/}
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
}: // openOutOfStockList,
{
  openDialog: (dialog: "approve" | "destination" | "signup") => void;
  // openOutOfStockList: (outOfStockProducts: any) => void;
}) => {
  const dispatch = useAppDispatch();
  // const { facilityId } = useSelectedFacility();

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

  /* const checkStock = () => {
    const outOfStockProducts: any[] = [];
    api.getInventory({ warehouse: facilityId }).then((products) => {
      cartItems.forEach((item) => {
        products.forEach((product) => {
          if (
            product.productOptionId === item.productOptionId &&
            product.quantity < item.quantity
          )
            return outOfStockProducts.push(product);
        });
      });
      outOfStockProducts.length === 0
        ? orderMutation.mutate("open")
        : openOutOfStockList(outOfStockProducts);
    });
    // orderMutation.mutate("open")
  }; */

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
