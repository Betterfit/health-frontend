import { api } from "Helpers/typedAPI";
import { useQuery, UseQueryOptions } from "react-query";
import { PaymentMethod } from "Types";

export const usePaymentMethods = (
  options: UseQueryOptions<PaymentMethod[], Error> = {}
) => {
  return useQuery<PaymentMethod[], Error>(
    "paymentMethods",
    () => api.getPaymentMethods().then((resp) => resp.data),
    { ...options }
  );
};
