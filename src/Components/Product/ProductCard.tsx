import clsx from "clsx";
import CircleButton from "Components/Forms/CircleButton";
import FlatButton from "Components/Forms/FlatDetailButton";
import { setProductNavInfo } from "Containers/Facility/Inner/ProductList";
import { useCartStore } from "Context/cartContext";
import { api } from "Helpers/typedAPI";
import EmptyImage from "Images/emptyImage.png";
import _ from "lodash";
import { useSelectedFacility } from "Models/facilities";
import { productDisplayName } from "Models/products";
import { formatCurrency } from "Pages/Requests/RequestsPage";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import { ProductOption, SupplierQuote } from "Types";

//The html component for the product image
//If no image can be found - return nothing
const ProductImage = ({
  product,
  hover,
}: {
  product: ProductOption;
  hover: boolean;
}) => {
  return (
    <img
      className={clsx("max-h-full", hover && "opacity-50")}
      src={product.productImage ?? EmptyImage}
      alt={productDisplayName(product) + " Product Image" ?? "Product Image"}
      loading="lazy"
      data-sizes="auto"
    />
  );
};

const ProductCard = ({ product }: { product: ProductOption }) => {
  const cartStore = useCartStore();
  const history = useHistory();
  const [active, setActive] = useState(false);
  const addToCart = () => {
    (cartStore as any)?.addToCart(product.id, 1, false, product.productId);
  };
  const displayName = productDisplayName(product);
  const { facilityId } = useSelectedFacility();
  const pricingQueryProps = { productOptionId: product.id, facilityId };
  const pricingQuery = useQuery(
    ["pricing", pricingQueryProps],
    () => api.getPricing([pricingQueryProps]).then((result) => result.data[0]),
    { enabled: facilityId != null }
  );
  const { data: pricing } = pricingQuery;
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
          <ProductImage product={product} hover={active} />
          <div className="flex flex-col md:pt-7 pl-4  w-1/2 md:w-auto">
            <h1 className="text-sm md:text-base font-semibold text-status-dark-blue ">
              {displayName}
            </h1>
            <span className="text-betterfit-grey-blue text-xs">
              {product.name ?? "N/A"}
            </span>
            {pricing && (
              <ProductPricing purchaseOptions={pricing.purchaseOptions} />
            )}
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

const ProductPricing = ({
  purchaseOptions,
}: {
  purchaseOptions: SupplierQuote[];
}) => {
  const minPrice = _.minBy(purchaseOptions, (po) => po.priceInfo.minPricePer)
    ?.priceInfo.minPricePer;
  const maxPrice = _.maxBy(purchaseOptions, (po) => po.priceInfo.minPricePer)
    ?.priceInfo.maxPricePer;
  return (
    <>
      <span className="text-betterfit-grey-blue text-xs">
        {purchaseOptions.length + " Suppliers"}
      </span>
      <span className="text-betterfit-grey-blue text-xs">
        {formatCurrency(minPrice)} - {formatCurrency(maxPrice)}
      </span>
    </>
  );
};

export default ProductCard;
