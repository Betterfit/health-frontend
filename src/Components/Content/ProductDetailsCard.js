import ProductImageCard from "Components/Content/ProductImageCard";
import React from "react";
import InventoryDescription from "../Inventory/Inventory_Description";

const ProductDetailCard = ({ product, children }) => {
  return (
    <div className="flex lg:flex-row flex-col-reverse">
      <div className="xl:w-3/5 lg:w-1/2 lg:pr-12 py-4 mx-2">
        <InventoryDescription
          title={product.product_label}
          description={product.product_label_value ?? "N/A"}
          class_addons="pb-2"
        />
        {product.product_category && (
          <InventoryDescription
            title="Category"
            class_addons="pb-2 pt-4"
            description={product.product_category ?? "N/A"}
          />
        )}
        {product.product_description && (
          <InventoryDescription
            title="Description"
            class_addons="pb-2 pt-4"
            description={product.product_description ?? "N/A"}
          />
        )}
      </div>
      <div className="xl:w-2/5 lg:w-1/2 py-4 mx-2">
        <ProductImageCard image={product.product_image} name={product.name}>
          {children}
        </ProductImageCard>
      </div>
    </div>
  );
};
export default ProductDetailCard;
