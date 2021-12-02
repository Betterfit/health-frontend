import clsx from "clsx";
import CircleButton from "Components/Forms/CircleButton";
import FlatButton from "Components/Forms/FlatDetailButton";
import { setProductNavInfo } from "Containers/Facility/Inner/ProductList";
import { productDisplayName } from "Models/products";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch } from "Store/store";
import { ProductOption } from "Types";
import styles from "./ProductCard.module.css";
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
  const viewDetails = () =>
    setProductNavInfo(history, { productId: product.id });
  return (
    <>
      <div
        className={clsx(
          styles.productCard,
          "mb-2 rounded relative md:flex-col justify-content flex h-auto ",
          active
            ? "bg-betterfit-pale-blue border border-betterfit-highlight-blue"
            : "bg-betterfit-soft-blue border border-transparent"
        )}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <div
          role="listitem"
          aria-label={displayName}
          className="flex flex-col p-2 h-full w-full items-stretch"
        >
          <ProductImage
            product={product}
            className={active ? "opacity-50" : ""}
          />
          <div className="flex flex-col pt-7 pl-4 w-auto flex-1">
            <button
              className="text-base text-left font-semibold text-status-dark-blue "
              onClick={viewDetails}
            >
              {displayName}
            </button>
            <span className="text-betterfit-grey-blue text-md">
              {product.name ?? "N/A"}
            </span>
            <span className="text-betterfit-grey-blue text-sm">Supplied by : </span>
            <span className="text-betterfit-grey-blue text-md font-bold">{product.supplier.name}</span>
            <span className="text-betterfit-grey-blue text-sm">
              ${product.price}
            </span>
          </div>

          <div className="flex flex-row pl-4 pr-2 py-1 justify-between items-center ml-auto mt-auto">
            <p className="text-betterfit-graphite uppercase text-xxs font-semibold mr-2">
              {product.productCategory}
            </p>
            <CircleButton hover={active} onClick={() => addToCart()} />
          </div>
        </div>
        {active && (
          <FlatButton
            text="View Details"
            onClick={viewDetails}
            extras="hidden md:block"
          />
        )}
      </div>
    </>
  );
};

export default ProductCard;
