import { TextField } from "@material-ui/core";
import clsx from "clsx";
import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";
import ProductImage from "Components/Product/ProductImage";
import ReturnPolicy from "Components/Product/ReturnPolicy";
import { api } from "Helpers/typedAPI";
import { formatCurrency } from "Helpers/utils";
import Close from "Images/Icons/red-close.svg";
import { productDisplayName, useProductOption } from "Models/products";
import React, { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { ReactSVG } from "react-svg";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import { CartItem } from "Types";
import styles from "./CartItemCard.module.css";

const CartItemCard = ({ cartItem }: { cartItem: CartItem }) => {
  const dispatch = useAppDispatch();
  const { productOptionId, quantity } = cartItem;
  const { data: product } = useProductOption(cartItem.productOptionId);
  const facilityId = useAppSelector((state) => state.cart.destinationId);
  const priceRequest = {
    productOptionId: cartItem.productOptionId,
    facilityId,
    quantity: cartItem.quantity,
  };
  const priceQuery = useQuery(
    ["pricing", priceRequest],
    () => api.getPricing([priceRequest]).then((response) => response.data[0]),
    { keepPreviousData: true }
  );
  // we don't immediately update the cart whenever the user changes quantity
  // because then we could send out dozens of requests if they hold down the increment button.
  // Instead we only update every 500ms
  const quantityInput = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (quantityInput) {
        const newQuantity = quantityInput?.current?.valueAsNumber;
        if (newQuantity && newQuantity !== quantity)
          dispatch(
            cartActions.updateItemQuantity({
              productOptionId,
              quantity: newQuantity,
            })
          );
      }
    }, 500);
    return () => clearInterval(interval);
  }, [quantity, dispatch, productOptionId]);
  // if there are no suppliers with this product in stock, and this may be undefined
  const priceInfo = priceQuery.data?.purchaseOptions[0];
  const supplier = priceInfo?.supplier;
  const outOfStock = priceQuery.isSuccess && !priceInfo;

  const displayName = productDisplayName(product);

  return (
    <>
      <div
        role="listitem"
        aria-label={displayName}
        className={
          "mb-2 bg-white rounded relative orderCartCard border-transparent flex flex-col"
        }
      >
        <button
          onClick={() => dispatch(cartActions.removeById(productOptionId))}
          aria-label="remove from cart"
          className="absolute top-0 right-0 transform translate-x-1/2 z-100 opacity-0 removeCartItem"
        >
          <ReactSVG src={Close} className="flex items-center" />
        </button>
        <div className="flex md:flex-row px-4">
          <ProductImage
            product={product}
            className={clsx(
              "h-20 w-20 md:h-32 md:w-32 pt-3 pr-3 object-contain",
              outOfStock && styles.outOfStock
            )}
          />
          <div className="flex-col pt-7">
            <h1 className={"text-base font-semibold text-betterfit-graphite"}>
              {displayName}
            </h1>
            <span className="text-betterfit-grey-blue text-md">
              {product?.name ? product.name : "N/A"}
            </span>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-around items-center py-1">
          {priceInfo && (
            <HorizontalDetail
              label="Price Per Unit"
              value={formatCurrency(priceInfo.priceInfo.pricePer)}
            />
          )}
          {priceInfo && (
            <HorizontalDetail
              label="Fulfilled by"
              value={priceInfo.supplier.name}
            />
          )}
          {supplier && <ReturnPolicy supplier={supplier} />}
          {outOfStock && <p className={styles.outOfStock}>Out of stock!</p>}
        </div>
        <TextField
          inputRef={quantityInput}
          className={styles.quantity}
          id="quantity-input"
          label="Quantity"
          size="small"
          name="Quantity"
          defaultValue={quantity}
          type="number"
          inputProps={{ min: 1 }}
          variant="outlined"
          style={{ width: "80px" }}
        />
      </div>
    </>
  );
};
export default CartItemCard;
