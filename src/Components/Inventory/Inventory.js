import React from "react";
import Inventory_Description from "../Inventory/Inventory_Description";
import ProductImageCard from "Components/Content/ProductImageCard"
import EditProductForm from "Components/Forms/EditProductForm"

//This will either return the attribute if it exists, or
// return the passed in 'default_value' if not
const Read_Product = (product_attr, default_value) => {
  if (product_attr === undefined) {
    return default_value;
  }
  return product_attr;
};

const Inventory = ({ product, edit }) => {
  return (
    <>
      <div className="flex lg:flex-row flex-col-reverse">
        <div className="xl:w-3/5 lg:w-1/2 lg:pr-12 py-4 mx-2">
          <Inventory_Description
            title={Read_Product(product.product_label, "Label")}
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
        <ProductImageCard image={product.product_image} name ={product.product_name}>
          <EditProductForm  matched={product.product_alloted} avail={product.product_available}  />
        </ProductImageCard>
        </div>
      </div>
    </>
  );
};
export default Inventory;
