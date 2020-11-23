import React, { useState, useEffect } from "react";
import Api from "Helpers/api";
import CategoryCard from "Components/Order/CategoryCard";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import Spinner from "Images/spinner.gif";


const DashboardCategoryList = (props) => {
  const api = new Api();
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
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative p-2">
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div className="relative w-3/4 min-h-screen" style={{margin:'0 auto',}}> 
          <img className="absolute left-0 right-0 spinner" style={{maxWidth:150}} src={Spinner} />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap justify-between items-center pb-4 mb-8 border-b border-betterfit-grey">
            <TitleUnderLine title="Products" nounderline={true} extraclasses=" hidden md:block no-margin" />
    
          </div>
          <div className="mb-6 md:mb-10 grid grid-cols-1 gap-2 lg:gap-4 md:grids-cols-2 lg:grid-cols-3 customcategorygrid">
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
