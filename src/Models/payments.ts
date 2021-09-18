import { api } from "Helpers/typedAPI";
import { useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { Payment } from "Types";

/**
 * Hook to fetch payments.
 * @returns
 */
export const usePayments = (
  filters: { order?: number; paymentMethod?: number },
  queryOptions?: UseQueryOptions<Payment[]>
) => {
  const queryClient = useQueryClient();
  const { order, paymentMethod } = filters;
  return useQuery<Payment[]>(
    ["payments", filters],
    () => api.getPayments(filters),
    {
      // search through cached payments first to avoid sending a request
      initialData: () => {
        const cache = queryClient.getQueryData("payments") as
          | Payment[]
          | undefined;
        return cache?.filter(
          (payment) =>
            (!order || payment.orderId === order) &&
            (!paymentMethod || payment.paymentMethodId === paymentMethod)
        );
      },
      ...queryOptions,
    }
  );
};
