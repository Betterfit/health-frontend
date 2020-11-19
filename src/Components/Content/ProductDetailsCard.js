import React from "react";
import Inventory_Description from "../Inventory/Inventory_Description";
import ProductImageCard from "Components/Content/ProductImageCard";
import AddProductForm from "Components/Forms/AddProductForm";
import EditProductForm from "Components/Forms/EditProductForm";


//This will either return the attribute if it exists, or
// return the passed in 'default_value' if not
const Read_Product = (product_attr, default_value) => {
  if (product_attr === undefined) {
    return default_value;
  }
  return product_attr;
};

const ProductDetailCard = ({ product, edit = false }) => {
  console.log("LKJLKJEEEE")
  return (
    <>
      <div className="flex lg:flex-row flex-col-reverse">
        <div className="xl:w-3/5 lg:w-1/2 lg:pr-12 py-4 mx-2">
          <Inventory_Description
            title={product.product_label}
            description={Read_Product(product.product_label_value, "N/A")}
            class_addons="pb-2"
          ></Inventory_Description>
          {product.product_category && (          
            <Inventory_Description
              title="Category"
              class_addons="pb-2 pt-4"
              description={Read_Product(product.product_category, "N/A")}
            ></Inventory_Description>
            )}
          <Inventory_Description
            title="Description"
            class_addons="pb-2 pt-4"
            description={Read_Product(product.product_description, "N/A")}
          ></Inventory_Description>
        </div>
        <div className="xl:w-2/5 lg:w-1/2 py-4 mx-2">
          <ProductImageCard image={product.product_image} name={product.name}>
            {edit && (
              <EditProductForm
                matched={product.product_alloted}
                avail={product.product_available}
                id={product.pk}
              />
            )}
            {!edit && (
              <AddProductForm id={product.pk}/>
            )}
          </ProductImageCard>
        </div>
      </div>
    </>
  );
};
export default ProductDetailCard;
