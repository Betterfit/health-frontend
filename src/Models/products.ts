import { api } from "Helpers/typedAPI";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { ProductOption } from "Types";

export const useProductOption = (
  id: number,
  queryOptions?: UseQueryOptions<ProductOption>
) => {
  const queryClient = useQueryClient();
  return useQuery(["productOptions", { id }], () => api.getProductOption(id), {
    // try to fetch product option from the cache
    initialData: () => {
      // https://react-query.tanstack.com/guides/filters#query-filters
      const cache = queryClient.getQueriesData<ProductOption[] | undefined>({
        queryKey: "productOptions",
        // search through all queries that weren't for a specific product option,
        // because one of them might contain this product option.
        predicate: ({ queryKey }) =>
          queryKey.length <= 1 || !("id" in (queryKey[1] as any)),
      });
      // each query was for multiple product options, so we flatten
      const productOptions = cache
        .map((query) => query[1]) // pull data from query
        .flat();
      return productOptions.find((product) => product?.id === id);
    },
    ...queryOptions,
  });
};

/** Hold over from when product name had to be computed using product variation*/
export const productDisplayName = (
  product: ProductOption | undefined
): string => {
  if (!product) return "";
  return `${product.product}`;
};
