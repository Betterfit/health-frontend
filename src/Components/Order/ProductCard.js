import React, { useState } from "react";
import CircleButton from "Components/Forms/CircleButton";
import FlatButton from "Components/Forms/FlatDetailButton";
import EmptyImage from "Images/emptyImage.png";

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
const ProductImage = ({ product_image, product_name, hover }) => {
  return (
    <img
      className={" " + (hover ? "opacity-50" : "")}
      src={Read_Product(product_image.image, EmptyImage)}
      alt={Read_Product(product_name + " Product Image", "Product Image")}
      loading="lazy"
      data-sizes="auto"
    ></img>
  );
};

const ProductCard = ({ product, category, extra }) => {
  const [active, setActive] = useState(false);
  console.log("Iner", extra)
  const name = product.name;
  const image = (product.image ? product.image : "");
  const size = product.size;
  return (
    <>
      <div
        className={
          "mb-2 rounded relative flex flex-col justify-content " +
          (active
            ? "bg-betterfit-pale-blue border border-betterfit-highlight-blue"
            : "bg-betterfit-soft-blue")
        }
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <div className="flex flex-col p-1">
          <ProductImage
            product_name={name}
            product_image={image}
            hover={active}
          />
          <div className="flex-col pt-7 pl-4">
            <h1 className="text-base font-semibold text-status-dark-blue">
              {Read_Product(name, "")}
            </h1>
            <span className="text-betterfit-grey-blue text-xs">
              {Read_Product(size, "N/A")}
            </span>
          </div>

          <div className="flex flex-row pl-4 pr-2 py-1 justify-between  items-center">
            <p className="text-betterfit-basic-blue uppercase opacity-50 text-xxs font-semibold">
              {category}
            </p>
            <CircleButton hover={active} />
          </div>
        </div>
        {active && <FlatButton text="View Details" />}
      </div>
    </>
  );
};
export default ProductCard;
