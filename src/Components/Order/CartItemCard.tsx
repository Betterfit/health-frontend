import { TextField } from "@material-ui/core";
import clsx from "clsx";
import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";
import ProductImage from "Components/Product/ProductImage";
import ReturnPolicy from "Components/Product/ReturnPolicy";
import Close from "Images/Icons/red-close.svg";
import { productDisplayName, useProductOption } from "Models/products";
import React from "react";
import { ReactSVG } from "react-svg";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch } from "Store/store";
import { CartItem } from "Types";
import styles from "./CartItemCard.module.css";

/**
 * The cards shown on the cart that represent OrderProducts.
 * This allows the quantity to be changed and for the OrderProduct to be deleted.
 */
const CartItemCard = ({ cartItem }: { cartItem: CartItem }) => {
  const dispatch = useAppDispatch();
  const { productOptionId, quantity } = cartItem;
  const { data: product } = useProductOption(cartItem.productOptionId);
  // we don't immediately update the cart whenever the user changes quantity
  // because then we could send out dozens of requests if they hold down the increment button.
  // Instead we only update every 500ms
  const supplier = product?.supplier;
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
          className="absolute top-0 right-0 transform translate-x-1/2 z-100 scale-150"
        >
          <ReactSVG src={Close} className="flex items-center" />
        </button>
        <div className="flex md:flex-row px-4">
          <ProductImage
            product={product}
            className={clsx(
              "h-20 w-20 md:h-32 md:w-32 pt-3 pr-3 object-contain"
              // outOfStock && styles.outOfStock
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
          {product && (
            <HorizontalDetail
              label="Price Per Unit"
              value={"$" + product?.price}
            />
          )}
          {product?.freeShipping && (
            <p className="font-bold  text-lucky-green">Free Shipping</p>
          )}
          {supplier && (
            <HorizontalDetail label="Fulfilled by" value={supplier.name} />
          )}
          {supplier && <ReturnPolicy supplier={supplier} />}
        </div>
        <TextField
          className={styles.quantity}
          onChange={(e) =>
            dispatch(
              cartActions.updateItemQuantity({
                productOptionId,
                quantity: Number(e.target.value),
              })
            )
          }
          id="quantity-input"
          label="Quantity"
          size="small"
          name="Quantity"
          defaultValue={quantity}
          type="number"
          inputProps={{ min: 1 }}
          variant="outlined"
          style={{ width: "80px" }}
          onKeyDown={(event) => {
            event.preventDefault();
          }}
        />
      </div>
    </>
  );
};
export default CartItemCard;
