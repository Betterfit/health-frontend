import React, { useState, useEffect } from "react";
import BackNavigation from "Components/Helpers/BackNavigation";
import CategoryTitle from "Components/Content/CategoryTitle";
import Api from "Helpers/api";
import ProductCard from "Components/Order/ProductCard";
import Search from 'Components/Search/Search';
import image from "Images/example_product.png"; //remove this later
import Spinner from "Images/spinner.gif";
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
        <div className="relative w-3/4 min-h-screen" style={{margin:'0 auto',}}> 
          <img className="absolute left-0 right-0 spinner" style={{maxWidth:150}} src={Spinner} />
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
            <Search />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6 md:mb-10">
            {CategoryData.products.map((p) =>
              p.product_variations.map((p2) =>{
                return(
                  p2.product_options.map((p3) => (
                    <ProductCard
                      key={`${p3.name}`}
                      product={p2}
                      product_details={p3}
                      category={CategoryData.name}
                      extra={CategoryData}
                      parent={p.name ? p.name : null}
                    />
                  ))
                )
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCategoryProductList;
