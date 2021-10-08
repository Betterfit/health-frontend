import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import BackNavigation from "Components/Helpers/BackNavigation";
import Table from "Components/Table/Basic/Table";
import Api from "Helpers/api";
import { useUserFacilities } from "Models/facilities";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

const DashboardProductList = ({ showAll = false }) => {
  const api = new Api();
  const params = useParams();
  const productId = parseInt(params.id);
  const { data: myFacilities } = useUserFacilities();
  const facilityId =
    !showAll && myFacilities?.length ? myFacilities[0].id : undefined;
  const productsQuery = useQuery(
    ["products", { facilityId, productId }],
    async () => {
      const response = await (showAll
        ? api.getProduct(productId)
        : api.getProductByWarehouse(productId, facilityId));
      const data = await response.data;
      data.product_variations.forEach((variation) => {
        variation.product_options = variation.product_options.map(
          (options) => ({
            [options.option_label]: options.name,
            pk: options.pk,
            // only show inventory quantity if we're not on the /all page
            ...(!showAll && {
              committed: options.allotted,
              available: options.quantity,
              total: options.allotted + options.quantity,
            }),
          })
        );
      });
      return data;
    },
    { enabled: showAll || facilityId != null }
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
                <Table key={i} TableData={product} ProductId={productId} edit />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardProductList;
