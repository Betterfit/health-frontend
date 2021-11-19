import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import BackNavigation from "Components/Helpers/BackNavigation";
import ProductDetail from "Components/Product/ProductDetail";
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
    <>
      <BackNavigation link={`Back to Products`} />
      <TitleUnderLine title={productDisplayName(product)} />
      <div className="w-full flex place-self-center justify-self-center m-auto">
        <ProductDetail product={product} />
      </div>
    </>
  );
};

export default DashboardProductDetail;
