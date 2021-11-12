import CircleButton from "Components/Forms/CircleButton";
import FlatButton from "Components/Forms/FlatDetailButton";
import { setProductNavInfo } from "Containers/Facility/Inner/ProductList";
import { productDisplayName } from "Models/products";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch } from "Store/store";
import { ProductOption } from "Types";
import ProductImage from "./ProductImage";

/**
 * A product card shown in the catalog when placing orders.
 */
const ProductCard = ({ product }: { product: ProductOption }) => {
  const history = useHistory();
  const [active, setActive] = useState(false);
  const dispatch = useAppDispatch();
  const addToCart = () => {
    dispatch(cartActions.addItem({ productOptionId: product.id, quantity: 1 }));
  };
  const displayName = productDisplayName(product);
  return (
    <>
      <div
        className={
          "mb-2 rounded relative md:flex-col justify-content flex h-24 md:h-auto " +
          (active
            ? "bg-betterfit-pale-blue border border-betterfit-highlight-blue"
            : "bg-betterfit-soft-blue")
        }
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <div
          role="listitem"
          aria-label={displayName}
          className="flex md:flex-col p-2 h-full w-full items-center md:items-stretch"
        >
          <ProductImage
            product={product}
            className={active ? "opacity-50" : ""}
          />
          <div className="flex flex-col md:pt-7 pl-4  w-1/2 md:w-auto flex-1">
            <h1 className="text-lg md:text-base font-semibold text-status-dark-blue ">
              {displayName}
            </h1>
            <span className="text-betterfit-grey-blue text-md">
              {product.name ?? "N/A"}
            </span>
            <span className="text-betterfit-grey-blue text-sm">
              ${product.price}
            </span>
          </div>

          <div className="flex flex-row pl-4 pr-2 py-1 justify-between items-center ml-auto mt-0 md:ml-0 md:mt-auto">
            <p className="text-betterfit-graphite uppercase text-xxs font-semibold hidden md:block">
              {product.productCategory}
            </p>
            <CircleButton hover={active} onClick={() => addToCart()} />
          </div>
        </div>
        {active && (
          <FlatButton
            text="View Details"
            onClick={() => {
              setProductNavInfo(history, { productId: product.id });
            }}
            extras="hidden md:block"
          />
        )}
      </div>
    </>
  );
};

export default ProductCard;
