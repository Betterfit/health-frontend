import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import BackNavigation from "Components/Helpers/BackNavigation";
import CategoryTitle from "Components/Product/CategoryTitle";
import ProductCard from "Components/Product/ProductCard";
import ProductSearch from "Components/Product/ProductSearch";
import { api } from "Helpers/typedAPI";
import { buildQueryString } from "Helpers/utils";
import { History } from "history";
import React from "react";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Parses navigation information from the url for the New Order page.
 * If orderId is not null, then the users currently editing an existing order.
 */
export const useProductNavInfo = (): ProductNavInfo => {
  const queryParams = useQueryParams();
  return {
    productId: queryParams.has("productId")
      ? Number(queryParams.get("productId"))
      : undefined,
    search: queryParams.get("search") ?? undefined,
    // because these will be hashed and used as a query key, it's important we
    // don't get null values or NaN (only undefined)
    categoryId: queryParams.has("categoryId")
      ? Number(queryParams.get("categoryId"))
      : undefined,
    orderId: queryParams.has("orderId")
      ? Number(queryParams.get("orderId"))
      : undefined,
  };
};

/**
 * Saves product catalog navigation information to the url, causing the app to
 * redirect to the correct page.
 */
export const setProductNavInfo = (
  history: History,
  newNavInfo: ProductNavInfo
) => {
  history.push({ search: buildQueryString({ ...newNavInfo }) });
};
export interface ProductNavInfo {
  productId?: number;
  search?: string;
  categoryId?: number;
  orderId?: number;
}

const ProductList = () => {
  const history = useHistory();
  const { categoryId, search } = useProductNavInfo();
  const { data: category } = useQuery(
    ["productCategories", { id: categoryId }],
    () => api.getCategory(categoryId!),
    { enabled: categoryId != null }
  );
  const productsQuery = useQuery(
    ["productOptions", { categoryId, search }],
    () => api.getProductOptions({ category: categoryId, search })
  );
  if (!productsQuery.isSuccess) {
    return <LoadingSpinner bubbleColor="gray" />;
  }
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative p-2 mt-2 h-full">
      {(categoryId || search) && (
        <BackNavigation
          link="Back To Product Categories"
          onClickOverride={() => setProductNavInfo(history, {})}
        />
      )}
      <div className="flex flex-wrap justify-between items-center pb-4 mb-8 border-b border-betterfit-grey">
        <CategoryTitle
          title={category?.name ?? "All Products"}
          icon={category?.icon}
        />
        <ProductSearch />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6 md:mb-10 customproductgrid">
        {productsQuery.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
