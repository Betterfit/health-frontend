import React, { useState } from "react";
import CircleButton from "Components/Forms/CircleButton";
import FlatButton from "Components/Forms/FlatDetailButton";
import EmptyImage from "Images/emptyImage.png";
import { useHistory } from "react-router-dom";
import {useCartStore} from "Context/cartContext";

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
const ProductImage = ({ product_image, product_name, hover }) => {
  return (
    <img
      className={"max-h-full  " + (hover ? "opacity-50" : "")}
      src={Read_Product(product_image, EmptyImage)}
      alt={Read_Product(product_name + " Product Image", "Product Image")}
      loading="lazy"
      data-sizes="auto"
    ></img>
  );
};

const ProductCard = ({ product, product_details, category, extra, parent }) => {
  const cartStore = useCartStore();
  const history = useHistory();
  const [active, setActive] = useState(false);
  const name = product.name;
  const image = product_details.product_image ? product_details.product_image : null;
  const size = product_details.name;
  const addToCart = () => {
    cartStore.addToCart(product_details.pk,1,false,product.pk)
  }

  return (
    <>
      <div
        className={
          "mb-2 rounded relative flex md:flex-col justify-content flex h-24 md:h-auto " +
          (active
            ? "bg-betterfit-pale-blue border border-betterfit-highlight-blue"
            : "bg-betterfit-soft-blue")
        }
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <div className="flex md:flex-col p-2 h-full w-full items-center md:items-stretch">
          <ProductImage
            product_name={name}
            product_image={image}
            hover={active}
          />
          <div className="flex flex-col md:pt-7 pl-4  w-1/2 md:w-auto">
            <h1 className="text-sm md:text-base font-semibold text-status-dark-blue ">
              { parent ? `${parent} - ` : "" } {Read_Product(name, "")}
            </h1>
            <span className="text-betterfit-grey-blue text-xs">
              {Read_Product(size, "N/A")}
            </span>
          </div>

          <div className="flex flex-row pl-4 pr-2 py-1 justify-between items-center ml-auto mt-0 md:ml-0 md:mt-auto">
            <p className="text-betterfit-graphite uppercase text-xxs font-semibold hidden md:block">
              {category}
            </p>
            <CircleButton hover={active} onClick={() => addToCart() } />
          </div>
        </div>
        {/*TODO - improve path here*/}
        {active && (
          <FlatButton
            text="View Details"
            onClick={() =>{
              let path = history.location.pathname.replace("/search", "")
              console.log(path);
              history.push(  path + "/product/" + product.pk + "/" + product_details.pk)
            }
            }
            extras="hidden md:block"
          />
        )}
      </div>
    </>
  );
};
export default ProductCard;
