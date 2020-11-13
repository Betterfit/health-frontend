import React, { useState, useEffect } from "react";
import Api from "Helpers/api";
import CategoryCard from "Components/Order/CategoryCard";
import image from "Images/example_product.png"; //remove this later
import TitleUnderLine from "Components/Content/TitleUnderLine";
import Search from 'Components/Search/Search';
import Spinner from "Images/spinner.gif";
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
        setIsError(true);
      });

  useEffect(() => {
    getData();
  }, []);



  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative">
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div className="relative w-3/4 min-h-screen" style={{margin:'0 auto',}}> 
          <img className="absolute left-0 right-0 spinner" style={{maxWidth:150}} src={Spinner} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center pb-4 mb-8 border-b border-gray-400">
            <TitleUnderLine title="Products" nounderline={true} extraclasses=" hidden md:block no-margin" />
            <Search />
          </div>
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
