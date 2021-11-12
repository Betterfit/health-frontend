import CategoryList from "Containers/Facility/Inner/CategoryList";
import DashboardProductDetail from "Containers/Facility/Inner/DashboardProductDetail";
import ProductList, {
  useProductNavInfo,
} from "Containers/Facility/Inner/ProductList";
import React from "react";

const ProductCatalog = () => {
  const productNavInfo = useProductNavInfo();
  console.log(productNavInfo);
  if (productNavInfo.productId)
    return (
      <DashboardProductDetail productOptionId={productNavInfo.productId} />
    );
  else if (productNavInfo.categoryId || productNavInfo.search)
    return <ProductList />;
  else return <CategoryList />;
};

export default ProductCatalog;
