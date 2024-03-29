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
import styles from "./ProductList.module.css";

function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

/**
 * Parses navigation information from the url for the New Order page.
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
  history.push({ search: buildQueryString(newNavInfo, false) });
};
export interface ProductNavInfo {
  productId?: number;
  search?: string;
  categoryId?: number;
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
    <>
      {(categoryId || search) && (
        <BackNavigation
          link="Back To Product Categories"
          onClickOverride={() => setProductNavInfo(history, {})}
        />
      )}
      <div className="flex flex-wrap justify-around items-center mt-6 mb-8 border-b border-betterfit-grey">
        <CategoryTitle
          title={category?.name ?? "All Products"}
          icon={category?.icon}
        />
        <ProductSearch />
      </div>
      <div className={styles.productList}>
        {productsQuery.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};
export default ProductList;
