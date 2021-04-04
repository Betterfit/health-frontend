import Checkbox from "Components/Forms/Checkbox";
import QuantityInput from "Components/Forms/Quantity_Input";
import { useCartStore } from "Context/cartContext";
import Close from "Images/Icons/red-close.svg";
import React, { useState } from "react";
import { ReactSVG } from "react-svg";
//This will either return the attribute if it exists, or
// return the passed in 'default_value' if not
const Read_Product = (product_attr, default_value) => {
  if (product_attr === undefined) {
    return default_value;
  }
  return product_attr;
};

//The html component for the product image
//If no image can be found - return nothing
const ProductImage = ({ product_image, product_name }) => {
  if (product_image === undefined) {
    return null;
  }
  return (
    <img
      className="h-20 w-20 md:h-32 md:w-32 pt-3 pr-3 object-contain"
      src={Read_Product(product_image, "")}
      alt={Read_Product(product_name + " Product Image", "Product Image")}
      loading="lazy"
      data-sizes="auto"
    ></img>
  );
};

const OrderProductCard = ({ product }) => {
  // cart store
  // console.log(product);
  const cartStore = useCartStore();
  // product state
  const [priority, setPriority] = useState(product.priority === false ? 0 : 1);
  const [quantity, getQuantity] = useState(
    product.quantity ? product.quantity : 1
  );
  // change product quantity
  const changeQuantity = (data) => {
    cartStore.updateItemQuantity(product.pk, data.quantity);
  };
  // change product priority
  const changePriority = (value) => {
    setPriority(value);
    cartStore.updateItemPriority(product.pk, value ? 1 : 0);
  };

  const displayName =
    (product.product ? `${product.product} - ` : "") +
    product.product_variation;

  return (
    <>
      <div
        role="listitem"
        aria-label={displayName}
        className={
          "mb-2 bg-white rounded relative orderCartCard " +
          (priority
            ? "border border-betterfit-highlight-red"
            : "border-transparent")
        }
      >
        <button
          onClick={() => cartStore.removeFromCart(product.pk)}
          aria-label="remove from cart"
          className="absolute top-0 right-0 transform translate-x-1/2 z-100 opacity-0 removeCartItem"
        >
          <ReactSVG src={Close} className="flex items-center" />
        </button>
        <div className="flex md:flex-row px-4">
          <ProductImage
            product_name={product.name}
            product_image={product.product_image}
          />
          <div className="flex-col pt-7">
            <h1
              className={
                "text-base font-semibold " +
                (priority
                  ? "text-betterfit-highlight-darkred"
                  : "text-betterfit-graphite ")
              }
            >
              {displayName}
            </h1>
            <span className="text-betterfit-grey-blue text-xs">
              {product.name ? product.name : "N/A"}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center justify-end py-3 pr-3">
          <div className="pr-2">
            <QuantityInput
              id="quantity"
              name="Quantity"
              quantityUpdate={(id, data) => {
                changeQuantity(id, data);
              }}
              value={quantity}
              readValue={getQuantity}
            />
          </div>
          <Checkbox
            id="priority"
            name="Stat"
            value={priority}
            setValue={(value) => {
              changePriority(value);
            }}
          />
        </div>
      </div>
    </>
  );
};
export default OrderProductCard;
