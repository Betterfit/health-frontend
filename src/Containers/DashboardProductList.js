import { useUserFacilities } from "APIHooks/facilities";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import BackNavigation from "Components/Helpers/BackNavigation";
import Table from "Components/Table/Basic/Table";
import Api from "Helpers/api";
import React from "react";
import { useQuery } from "react-query";

const DashboardProductList = (props) => {
  const api = new Api();
  const { match } = props;
  const productId = parseInt(match.params.id);
  const { data: myFacilities } = useUserFacilities();
  const facilityId = myFacilities?.length ? myFacilities[0].id : null;

  const productsQuery = useQuery(
    ["products", { facilityId, productId }],
    () =>
      api.getProductsBySupplier(facilityId, productId).then((response) => {
        let arr = response.data;
        console.log(arr);
        arr.product_variations = arr.product_variations.map((variations) => {
          let variation = variations;
          variation.product_options = variations.product_options.map(
            (options) => {
              let obj = {
                [options.option_label]: options.name,
                matched: options.allotted,
                available: options.quantity,
                total: options.allotted + options.quantity,
                pk: options.pk,
              };
              return obj;
            }
          );
          return variation;
        });
        return arr;
      }),
    { enabled: facilityId != null }
  );
  if (productsQuery.isLoading || productsQuery.isIdle)
    return <LoadingSpinner darkened />;
  const { data: productData } = productsQuery;
  console.log(productData);
  return (
    <>
      {productData && (
        <div className="lg:max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-8">
          {/* product title */}
          <div className="lg:hidden">
            <BackNavigation link="Back to products" />
          </div>

          <div className="">
            <TitleUnderLine title={`${productData.name}`} />
            {/* product description */}
            <p className="text-paragraph">{productData.description}</p>
            {productData.product_variations.map((product, i) => {
              return (
                <Table
                  key={i}
                  TableData={product}
                  ProductId={productId}
                  edit={props.edit}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardProductList;
