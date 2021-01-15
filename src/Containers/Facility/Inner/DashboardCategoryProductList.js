import CategoryTitle from "Components/Content/CategoryTitle";
import BackNavigation from "Components/Helpers/BackNavigation";
import ProductCard from "Components/Order/ProductCard";
import ProductSearch from "Components/Search/ProductSearch";
import Api from "Helpers/api";
import Spinner from "Images/spinner.gif";
import React, { useEffect, useState } from "react";

const DashboardCategoryProductList = (props) => {
  const api = new Api();
  const { match } = props;
  const CategoryID = parseInt(match.params.id);
  const CategoryName = match.params.categoryName;
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
        setIsLoading(false);
        setIsError(true);
      });

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative p-2 mt-2">
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div
          className="relative w-3/4 min-h-screen"
          style={{ margin: "0 auto" }}
        >
          <img
            className="absolute left-0 right-0 spinner"
            style={{ maxWidth: 150 }}
            src={Spinner}
            alt="Loading"
          />
        </div>
      ) : (
        <>
          <BackNavigation link={`Back to Product Categories`} />
          <div className="flex flex-wrap justify-between items-center pb-4 mb-8 border-b border-betterfit-grey">
            <CategoryTitle
              title={`${CategoryData.name}`}
              icon={CategoryData.icon}
              background_color={CategoryData.background_color}
              color={CategoryData.color}
            />
            <ProductSearch
              CategoryName={CategoryName}
              CategoryID={CategoryID}
              type={props.type}
              orderId={props.orderId}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 mb-6 md:mb-10 customproductgrid">
            {CategoryData.products.map((p) =>
              p.product_variations.map((p2) => {
                return p2.product_options.map((p3) => (
                  <ProductCard
                    key={`${p3.name}`}
                    product={p2}
                    product_details={p3}
                    category={CategoryData.name}
                    extra={CategoryData}
                    parent={p.name ? p.name : null}
                  />
                ));
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCategoryProductList;
