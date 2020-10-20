import React, { useState, useEffect } from "react";
import Quantity_Input from "Components/Forms/Quantity_Input"
import Checkbox from "Components/Forms/Checkbox"

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
  if (product_image === undefined ) {
    console.log('no image');
    return null;
  }
  return (
      <img
        className="h-20 w-20 md:h-32 md:w-32 pt-3 pr-3"
        src={Read_Product(product_image, "")}
        alt={Read_Product(product_name + " Product Image", "Product Image")}
        loading="lazy"
        data-sizes="auto"
      ></img>
  );
};

const OrderProductCard = ({ product }) => {
  const [priority, setPriority] = useState(product.priority);
  const [quantity, getQuantity] = useState(5);
  return (
    <>
      <div className={ "mb-2 bg-white rounded " + (priority ? "border border-betterfit-highlight-red" : "border-transparent") }>
        <div className="flex md:flex-row px-4">
          <ProductImage
            product_name={product.name}
            product_image={product.product_image}
          />
          <div className="flex-col pt-7">
            <h1 className={ "text-base font-semibold " + (priority ? "text-betterfit-highlight-darkred" : "text-betterfit-graphite ") }>
              {Read_Product(product.name, "")}
            </h1>
            <span className="text-betterfit-grey-blue text-xs">
              {Read_Product(product.product_size, "N/A")}
            </span>
          </div>
          </div>
          <div className = "flex flex-row items-center justify-end py-3 pr-3">
            <div className="pr-2">
              <Quantity_Input id="quantity" name="Quantity" value={quantity} readValue={getQuantity} />
            </div>
            <Checkbox id="priority" name="Stat" value={priority} setValue = {setPriority} />
          </div>
      </div>
    </>
  );
};
export default OrderProductCard;
