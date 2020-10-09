import React, { useState, useEffect } from "react";
import Button from "../Forms/Button";
import Inventory_Description from "../Inventory/Inventory_Description";
import Quantity_Input from "Components/Forms/Quantity_Input"
import Checkbox from "Components/Forms/Checkbox"
import CircleButton from "Components/Forms/CircleButton"
import FlatButton from "Components/Forms/FlatDetailButton"

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
const ProductImage = ({ product_image, product_name, hover}) => {
  if (product_image === undefined || !product_image.hasOwnProperty("image")) {
    return null;
  }
  return (
      <img
        className={ "h-20 w-20 md:h-56 md:w-56 pt-3 " + (hover ? "opacity-50": "") }
        src={Read_Product(product_image.image, "")}
        alt={Read_Product(product_name + " Product Image", "Product Image")}
        loading="lazy"
        data-sizes="auto"
      ></img>
  );
};

const ProductCard = ({ product }) => {
  const [priority, setPriority] = useState(product.priority);
  const [quantity, getQuantity] = useState(0);
  const [active, setActive] = useState(false);
  return (
    <>
      <div className={ "mb-2 rounded relative" + (active ? "bg-betterfit-pale-blue border border-betterfit-basic-blue" : "bg-betterfit-soft-blue") } 
      onMouseEnter={() => setActive(true)}
    onMouseLeave={() => setActive(false)}>
        <div className="flex flex-col px-4">
          <ProductImage
            product_name={product.product_name}
            product_image={product.product_image}
            hover = {active}
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
          <CircleButton hover={active}/>
          { active && 
          <FlatButton text="View Details"/>
}
      </div>
    </>
  );
};
export default ProductCard;
