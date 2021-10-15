import EditProductForm from "Components/Forms/EditProductForm";
import {
  HorizontalDetail,
  VerticalDetail,
} from "Components/InfoDisplay/LabeledDetails";
import React from "react";
import { ReactNode } from "react-transition-group/node_modules/@types/react";
import { Inventory, ProductOption } from "Types";

const ProductDetail = ({
  product,
  inventory,
  children,
}: {
  product: ProductOption;
  inventory?: Inventory;
  children?: ReactNode;
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-around w-full">
      <div className="xl:w-3/5 lg:w-1/2 lg:pr-12 py-4 mx-2">
        <img src={product.productImage} alt="" className="max-w-md" />
        <HorizontalDetail label={product.optionLabel} value={product.name} />
        <HorizontalDetail label="Category" value={product.productCategory} />
      </div>
      {inventory && (
        <div>
          <EditProductForm inventory={inventory} />
          <h3 className="text-center mediumTitle">Current Inventory</h3>
          <VerticalDetail label="Total Stock" value={inventory.quantity} />
          <VerticalDetail
            label="Committed to Open Orders"
            value={inventory.allottedQuantity}
          />
          <VerticalDetail
            label="Available to Sell"
            value={inventory.quantity - inventory.allottedQuantity}
          />
        </div>
      )}
      {children}
    </div>
  );
};
export default ProductDetail;
