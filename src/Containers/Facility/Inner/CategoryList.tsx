import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import CategoryCard from "Components/Order/CategoryCard";
import { api } from "Helpers/typedAPI";
import React from "react";
import { useQuery } from "react-query";

const CategoryList = () => {
  const categoriesQuery = useQuery("productCategories", api.getCategories);

  if (!categoriesQuery.isSuccess) return <LoadingSpinner bubbleColor="gray" />;

  const { data: categories } = categoriesQuery;
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative p-2 pt-8 h-full">
      <div className="flex flex-wrap justify-between items-center pb-4 mb-8 border-b border-betterfit-grey">
        <TitleUnderLine
          title="Product Categories"
          nounderline={true}
          extraclasses=" hidden md:block no-margin"
        />
      </div>
      <div className="mb-6 md:mb-10 grid grid-cols-1 gap-2 lg:gap-4 md:grids-cols-2 lg:grid-cols-3 customcategorygrid">
        {categories.map((category) => {
          return <CategoryCard key={category.id} category={category} />;
        })}
      </div>
    </div>
  );
};

export default CategoryList;
