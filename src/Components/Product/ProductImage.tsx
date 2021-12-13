import clsx from "clsx";
import EmptyImage from "Images/emptyImage.png";
import React from "react";
import { ProductOption } from "Types";

//The html component for the product image
//If no image can be found - return nothing
const ProductImage = ({
  product,
  className = "",
}: {
  product?: ProductOption;
  className?: string;
}) => {
  return (
    <img
      className={clsx("max-h-full", className)}
      src={product?.productImage ?? EmptyImage}
      alt=""
      loading="lazy"
      data-sizes="auto"
      onError={(e) => {
        e.currentTarget.src = EmptyImage;
      }}
    />
  );
};

export default ProductImage;
