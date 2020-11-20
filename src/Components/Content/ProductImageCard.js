import React, { useState } from "react";
import EmptyImage from "Images/emptyImage.png"

//This will either return the attribute if it exists, or
// return the passed in 'default_value' if not
const Read_Product = (product_attr, default_value) => {
  if (product_attr === undefined || product_attr === null) {
    return default_value;
  }
  return product_attr;
};

//The html component for the product image
//If no image can be found - return nothing
const ProductImage = ({ product_image, product_name }) => {
    return (<img
      className={"lg:w-auto lg:h-auto h-40 w-40"}
      src={Read_Product(product_image, EmptyImage)}
      alt={Read_Product(product_name + " Product Image", "Product Image")}
      loading="lazy"
      data-sizes="auto"
    ></img>
    )
};

const ProductImageCard = ({image, name, children}) => {
  return (
    <>
      <div className="mb-2 rounded relative flex lg:flex-col justify-content bg-betterfit-soft-blue self-start">
        <div className="flex lg:flex-col p-1 w-1/2 lg:w-auto">
          <ProductImage
            product_name={name}
            product_image={image}
          />

        </div>
        {children}
      </div>
    </>
  );
};
export default ProductImageCard;
