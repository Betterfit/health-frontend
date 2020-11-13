import React, { useState } from "react";
import Button from "../Forms/Button";
import Inventory_Description from "../Inventory/Inventory_Description";
import Quantity_Input from "Components/Forms/Quantity_Input";
import ProductImageCard from "Components/Content/ProductImageCard"
import AddProductForm from "Components/Forms/AddProductForm"
import {useCartStore} from "Context/cartContext";

//This will either return the attribute if it exists, or
// return the passed in 'default_value' if not
const Read_Product = (product_attr, default_value) => {
  if (product_attr === undefined) {
    return default_value;
  }
  return product_attr;
};

const ProductDetailCard = ({ product }) => {
  const cartStore = useCartStore();
  const addToCart = (quantity,priority) => {
    cartStore.addToCart(product.pk,quantity,priority)
  }
  return (
    <>
          <div className="flex lg:flex-row flex-col-reverse">
            <div className="xl:w-3/5 lg:w-1/2 lg:pr-12 py-4 mx-2">
              <Inventory_Description
                title={product.product_label}
                description={Read_Product(product.product_label_value, "N/A")}
                class_addons="pb-2"
              ></Inventory_Description>
              <Inventory_Description
                title="Description"
                class_addons="pb-2 pt-4"
                description={Read_Product(product.product_description, "N/A")}
              ></Inventory_Description>
            </div>
            <div className="xl:w-2/5 lg:w-1/2 py-4 mx-2">
            <ProductImageCard image={product.product_image} name ={product.name}>
                <AddProductForm addToCart={(quantity,priority) => addToCart(quantity,priority)} />
            </ProductImageCard>
            </div>
          </div>
    </>
  );
};
export default ProductDetailCard;
