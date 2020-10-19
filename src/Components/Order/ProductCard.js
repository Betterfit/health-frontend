import React, { useState } from "react";
import CircleButton from "Components/Forms/CircleButton";
import FlatButton from "Components/Forms/FlatDetailButton";
import EmptyImage from "Images/emptyImage.png";
import { useHistory } from "react-router-dom";
import useStores from 'Helpers/useStores';

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
      className={"w-1/4 md:w-auto " + (hover ? "opacity-50" : "")}
      src={Read_Product(product_image.image, EmptyImage)}
      alt={Read_Product(product_name + " Product Image", "Product Image")}
      loading="lazy"
      data-sizes="auto"
    ></img>
  );
};

const ProductCard = ({ product, product_details, category, extra }) => {
  const { store } = useStores();
  const history = useHistory();
  const [active, setActive] = useState(false);
  const name = product.name;
  const image = product.image ? product.image : "";
  const size = product_details.name;

  const addToCart = () => {
    store.cartStore.addToCart(product.pk,0)
  }

  return (
    <>
      <div
        className={
          "mb-2 rounded relative flex md:flex-col justify-content " +
          (active
            ? "bg-betterfit-pale-blue border border-betterfit-highlight-blue"
            : "bg-betterfit-soft-blue")
        }
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <div className="flex md:flex-col p-1 h-full">
          <ProductImage
            product_name={name}
            product_image={image}
            hover={active}
          />
          <div className="flex-col pt-7 pl-4">
            <h1 className="text-sm md:text-base font-semibold text-status-dark-blue">
              {Read_Product(name, "")}
            </h1>
            <span className="text-betterfit-grey-blue text-xs">
              {Read_Product(size, "N/A")}
            </span>
          </div>

          <div className="flex flex-row pl-4 pr-2 py-1 justify-between  items-center ml-auto mt-0 md:ml-0 md:mt-auto">
            <p className="text-betterfit-basic-blue uppercase opacity-50 text-xxs font-semibold hidden md:block">
              {category}
            </p>
            <CircleButton hover={active} onClick={() => addToCart() } />
          </div>
        </div>
        {/*TODO - improve path here*/}
        {active && (
          <FlatButton
            text="View Details"
            onClick={() =>
              history.push(history.location.pathname + "/product/" + product.pk + "/" + product_details.pk)
            }
            extras="hidden md:inline-block"
          />
        )}
      </div>
    </>
  );
};
export default ProductCard;