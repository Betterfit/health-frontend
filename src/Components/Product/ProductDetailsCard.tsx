import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";
import ProductImageCard from "Components/Product/ProductImageCard";
import React from "react";
import { ReactNode } from "react-transition-group/node_modules/@types/react";
import { ProductOption } from "Types";

const ProductDetailCard = ({
  product,
  children,
}: {
  product: ProductOption;
  children: ReactNode;
}) => {
  return (
    <div className="flex lg:flex-row flex-col-reverse">
      <div className="xl:w-3/5 lg:w-1/2 lg:pr-12 py-4 mx-2">
        <HorizontalDetail label={product.optionLabel} value={product.name} />
        <HorizontalDetail label="Category" value={product.productCategory} />
      </div>
      <div className="xl:w-2/5 lg:w-1/2 py-4 mx-2">
        <ProductImageCard image={product.productImage} name={product.name}>
          {children}
        </ProductImageCard>
      </div>
    </div>
  );
};
export default ProductDetailCard;
