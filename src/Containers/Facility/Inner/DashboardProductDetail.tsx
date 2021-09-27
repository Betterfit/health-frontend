import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import AddProductForm from "Components/Forms/AddProductForm";
//components
import BackNavigation from "Components/Helpers/BackNavigation";
import ProductDetailsCard from "Components/Product/ProductDetailsCard";
import { productDisplayName, useProductOption } from "Models/products";
import React from "react";

const DashboardProductDetail = ({
  productOptionId,
}: {
  productOptionId: number;
}) => {
  const productQuery = useProductOption(productOptionId);

  if (!productQuery.isSuccess)
    return (
      <LoadingSpinner bubbleColor="gray" genericError={productQuery.isError} />
    );
  const { data: product } = productQuery;
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative p-2">
      <BackNavigation link={`Back to Products`} />
      <TitleUnderLine title={productDisplayName(product)} />
      <div className="w-full flex place-self-center justify-self-center m-auto">
        <ProductDetailsCard product={product}>
          <AddProductForm id={product.id} product_pk={product.productId} />
        </ProductDetailsCard>
      </div>
    </div>
  );
};

export default DashboardProductDetail;
