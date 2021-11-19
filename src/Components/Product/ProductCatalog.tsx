import CategoryList from "Containers/Facility/Inner/CategoryList";
import DashboardProductDetail from "Containers/Facility/Inner/DashboardProductDetail";
import ProductList, {
  useProductNavInfo,
} from "Containers/Facility/Inner/ProductList";
import React from "react";

const ProductCatalog = () => {
  const productNavInfo = useProductNavInfo();
  let content: React.ReactNode;
  if (productNavInfo.productId)
    content = (
      <DashboardProductDetail productOptionId={productNavInfo.productId} />
    );
  else if (productNavInfo.categoryId || productNavInfo.search)
    content = <ProductList />;
  else content = <CategoryList />;
  return (
    <div className="mx-1 sm:px-6 md:px-8 relative p-2 pt-8 h-full">
      {content}
    </div>
  );
};

export default ProductCatalog;
