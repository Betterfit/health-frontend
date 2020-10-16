import React, { useState } from "react";
import Button from "../Forms/Button";
import Inventory_Description from "../Inventory/Inventory_Description";
import Quantity_Input from "Components/Forms/Quantity_Input";
import ProductImageCard from "Components/Content/ProductImageCard"
import AddProductForm from "Components/Forms/AddProductForm"

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
    <div className="product_image bg-white rounded-lg m-2 w-5/12 md:w-auto">
      <img
        src={Read_Product(product_image.image, "")}
        alt={Read_Product(product_name + " Product Image", "Product Image")}
        loading="lazy"
        data-sizes="auto"
      ></img>
    </div>
  );
};

const ProductDetailCard = ({ product, edit }) => {
  console.log(product)
  return (
    <>
          <div className="flex lg:flex-row flex-col-reverse">
            <div className="xl:w-3/5 lg:w-1/2 lg:pr-12 py-4 mx-2">
              <Inventory_Description
                title="Size"
                description={Read_Product(product.product_size, "N/A")}
                class_addons="pb-2"
              ></Inventory_Description>
              <Inventory_Description
                title="Description"
                class_addons="pb-2 pt-4"
                description={Read_Product(product.product_description, "")}
              ></Inventory_Description>
            </div>
            <div className="xl:w-2/5 lg:w-1/2 py-4 mx-2">
            <ProductImageCard product_image={(product?.image)} product_name ={product.name}>
                <AddProductForm />
            </ProductImageCard>
            </div>
          </div>
    </>
  );
};
export default ProductDetailCard;
