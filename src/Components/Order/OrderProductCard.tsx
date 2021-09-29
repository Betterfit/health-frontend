import { TextField } from "@material-ui/core";
import ProductImage from "Components/Product/ProductImage";
import Close from "Images/Icons/red-close.svg";
import { productDisplayName, useProductOption } from "Models/products";
import React from "react";
import { ReactSVG } from "react-svg";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch } from "Store/store";
import { CartItem } from "Types";

const OrderProductCard = ({ cartItem }: { cartItem: CartItem }) => {
  const { productOptionId, quantity } = cartItem;
  const { data: product } = useProductOption(cartItem.productOptionId);

  const dispatch = useAppDispatch();

  const setQuantity = (newQuantity: number) => {
    dispatch(
      cartActions.updateItemQuantity({
        productOptionId,
        quantity: newQuantity,
      })
    );
  };

  const displayName = productDisplayName(product);

  return (
    <>
      <div
        role="listitem"
        aria-label={displayName}
        className={
          "mb-2 bg-white rounded relative orderCartCard border-transparent"
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
            className="h-20 w-20 md:h-32 md:w-32 pt-3 pr-3 object-contain"
          />
          <div className="flex-col pt-7">
            <h1 className={"text-base font-semibold text-betterfit-graphite"}>
              {displayName}
            </h1>
            <span className="text-betterfit-grey-blue text-xs">
              {product?.name ? product.name : "N/A"}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end py-3 pr-3">
          <div className="pr-2">
            <TextField
              id="quantity-input"
              label="Quantity"
              size="small"
              name="Quantity"
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              inputProps={{ min: 1 }}
              variant="outlined"
              style={{ width: "80px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderProductCard;
