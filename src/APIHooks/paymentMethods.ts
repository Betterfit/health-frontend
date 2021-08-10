import { api } from "Helpers/typedAPI";
import { useQuery, UseQueryOptions } from "react-query";
import { CreditCardPaymentMethod } from "Types";

export const usePaymentMethods = (
  options: UseQueryOptions<CreditCardPaymentMethod[], Error> = {}
) => {
  return useQuery<CreditCardPaymentMethod[], Error>(
    "paymentMethods",
    () => api.getPaymentMethods().then((resp) => resp.data),
    { ...options }
  );
};
