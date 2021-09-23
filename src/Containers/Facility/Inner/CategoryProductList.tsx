import CategoryTitle from "Components/Content/CategoryTitle";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import BackNavigation from "Components/Helpers/BackNavigation";
import ProductCard from "Components/Order/ProductCard";
import { api } from "Helpers/typedAPI";
import React from "react";
import { useQuery } from "react-query";

const CategoryProductList = ({ categoryId }: { categoryId: number }) => {
  const { data: category } = useQuery(
    ["productCategories", { id: categoryId }],
    () => api.getCategory(categoryId)
  );
  const productsQuery = useQuery(
    ["productOptions", { categoryId: categoryId }],
    () => api.getProductOptions({ category: categoryId })
  );
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative p-2 mt-2 h-full">
      {!productsQuery.isSuccess || !category ? (
        <LoadingSpinner bubbleColor="gray" />
      ) : (
        <>
          <BackNavigation link={`Back to Product Categories`} />
          <div className="flex flex-wrap justify-between items-center pb-4 mb-8 border-b border-betterfit-grey">
            <CategoryTitle
              title={category.name}
              icon={category.icon}
              background_color={category.backgroundColor}
              color={category.mainColor}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-6 md:mb-10 customproductgrid">
            {productsQuery.data.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryProductList;
