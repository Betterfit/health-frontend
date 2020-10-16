import React, { useState, useEffect } from "react";
import BackNavigation from "Components/Helpers/BackNavigation";
import CategoryTitle from "Components/Content/CategoryTitle";
import Api from "Helpers/api";
import ProductCard from "Components/Order/ProductCard";
import image from "Images/example_product.png"; //remove this later
const api = new Api();

const DashboardCategoryProductList = (props) => {
  const { match } = props;
  const CategoryID = parseInt(match.params.id);
  const [isLoading, setIsLoading] = useState(true);
  const [CategoryData, setCategoryData] = useState(null);
  const [isError, setIsError] = useState(false);

  const getData = async () =>
    await api
      .getCategory(CategoryID)
      .then((response) => {
        setCategoryData(response.data);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });

  useEffect(() => {
    console.log("getting data");
    getData();
  }, []);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <BackNavigation link={`Back to Product Categories`} />
          <CategoryTitle
            title={`${CategoryData.name}`}
            icon={CategoryData.icon}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6 md:mb-10">
            {CategoryData.products.map((p) =>
              p.product_variations.map((p2) =>
                p2.product_options.map((p3) => (
                  <ProductCard
                    key={`${p3.name}`}
                    product={p2}
                    product_details={p3}
                    category={CategoryData.name}
                    extra={CategoryData}
                  />
                ))
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCategoryProductList;
