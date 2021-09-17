import { ProductOption } from "Types";

export const productDisplayName = (product: ProductOption): string => {
  return `${product.product} - ${product.productVariation}`;
};
