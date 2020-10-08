import React, { useState, useEffect } from "react";
import Button from "../Forms/Button";
import Inventory_Description from "../Inventory/Inventory_Description";
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
  if (product_image === undefined || !product_image.hasOwnProperty("image")) {
    return null;
  }
  return (
    <div className="md:w-3/12 relative pt-3">
      <img
        src={Read_Product(product_image.image, "")}
        alt={Read_Product(product_name + " Product Image", "Product Image")}
        loading="lazy"
        data-sizes="auto"
      ></img>
    </div>
  );
};

const OrderProductCard = ({ product }) => {
  const [priority, setPriority] = useState(product.priority);
  const [quantity, getQuantity] = useState(product.product_quantity);
  return (
    <>
      <div className={ "mb-2 bg-white rounded " + (priority ? "border border-betterfit-highlight-red" : "border-transparent") }>
        <div className="flex md:flex-row px-4">
          <ProductImage
            product_name={product.product_name}
            product_image={product.product_image}
          />
          <div className="flex-col pt-7">
            <h1 className={ "text-base font-semibold " + (priority ? "text-betterfit-highlight-darkred" : "text-betterfit-graphite ") }>
              {Read_Product(product.product_name, "")}
            </h1>
            <span className="text-betterfit-grey-blue text-xs">
              {Read_Product(product.product_size, "N/A")}
            </span>
          </div>
          </div>
          <div className = "flex flex-row items-center justify-end py-3">
            <Quantity_Input id="quantity" name="Quantity" value={product.product_quantity} readValue={getQuantity} />
            <Checkbox id="priority" name="Priority" value={priority} setValue = {setPriority} />
          </div>
      </div>
    </>
  );
};
export default OrderProductCard;
