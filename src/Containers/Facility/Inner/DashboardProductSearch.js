import TitleUnderLine from "Components/Content/TitleUnderLine";
import BackNavigation from "Components/Helpers/BackNavigation";
import ProductCard from "Components/Product/ProductCard";
import API from "Helpers/api";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import uuid from "react-uuid";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const DashboardProductSearch = () => {
  const api = new API();
  let query = useQuery();
  const [searchQuery, setSearchQuery] = useState(query.get("search"));
  const [searchData, setSearchData] = useState();
  const getSearchResults = async () =>
    await api
      .getProductOptionsSearch(query.get("category"), query.get("search"))
      .then((response) => {
        console.log(response.data);
        setSearchData(response.data);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getSearchResults();
  }, []);

  if (query.get("search") !== searchQuery) {
    setSearchQuery(query.get("search"));
    getSearchResults();
  }

  return (
    <div className="pt-8 px-2">
      {searchData && (
        <>
          <BackNavigation link="Back" />
          <div className="flex justify-between mt-8">
            <TitleUnderLine
              extraclasses="title-no-margin pt-0"
              nounderline={true}
              title={`Product search results for "${query.get("search")}"`}
            />
          </div>
          {/* <ProductSearch CategoryName = {CategoryName} CategoryID = {CategoryID} /> */}
          {searchData.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 mb-6 md:mb-10 customproductgrid">
              {searchData.map((item) => {
                console.log(item);
                let product = {
                  name: item.name,
                  pk: query.get("category"),
                };
                let productdetails = {
                  name: item.product_variation,
                  product_image: item.product_image,
                  pk: item.pk,
                };
                return (
                  <ProductCard
                    key={uuid()}
                    products={product}
                    product_details={productdetails}
                    category={item.product_category}
                    extra={null}
                    parent={item.product ? item.product : null}
                  />
                );
              })}
            </div>
          ) : (
            <div>No results for {query.get("search")}</div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardProductSearch;
