import React, { useState, useEffect } from "react";
import Api from "Helpers/api";
import CategoryCard from "Components/Order/CategoryCard";
import image from "Images/example_product.png"; //remove this later
import TitleUnderLine from "Components/Content/TitleUnderLine";
const api = new Api();

const DashboardCategoryList = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategory] = useState({ hits: [] });
  const [isError, setIsError] = useState(false);

  const getData = async () =>
    await api
      .getProductCategories()
      .then((response) => {
        setCategory(response.data);
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
          <TitleUnderLine title="Products" extraclasses=" hidden md:block" />
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2 mb-6 md:mb-10">
            {categories.map((p) => {
              return <CategoryCard key={`${p.name}`} category={p} />;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardCategoryList;
