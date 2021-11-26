import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import CategoryCard from "Components/Product/CategoryCard";
import ProductSearch from "Components/Product/ProductSearch";
import { api } from "Helpers/typedAPI";
import React from "react";
import { useQuery } from "react-query";

const CategoryList = () => {
  const categoriesQuery = useQuery("productCategories", api.getCategories);

  if (!categoriesQuery.isSuccess) return <LoadingSpinner bubbleColor="gray" />;

  const { data: categories } = categoriesQuery;
  return (
    <>
      <div className="flex flex-wrap justify-between items-center pb-4 mb-8 border-b border-betterfit-grey">
        <TitleUnderLine
          title="Product Categories"
          nounderline={true}
          extraclasses="hidden md:block no-margin"
        />
        <ProductSearch />
      </div>
      <div className="mb-6 md:mb-10 grid grid-cols-1 gap-2 lg:gap-4 md:grids-cols-2 lg:grid-cols-3 customcategorygrid">
        {categories
          .filter((category) => category.count > 0)
          .map((category) => {
            return <CategoryCard key={category.id} category={category} />;
          })}
      </div>
    </>
  );
};

export default CategoryList;
