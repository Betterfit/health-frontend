import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import EditProductForm from "Components/Forms/EditProductForm";
//Components
import BackNavigation from "Components/Helpers/BackNavigation";
import ProductDetailsCard from "Components/Product/ProductDetailsCard";
import Api from "Helpers/api";
import { useSelectedFacility } from "Models/facilities";
import React from "react";
import { useQuery } from "react-query";

const DashboardProductDetail = (props) => {
  const api = new Api();
  const { match } = props;
  const optionId = parseInt(match.params.oid);
  const { facilityId } = useSelectedFacility();
  const { data: productData, isLoading } = useQuery(
    // https://react-query.tanstack.com/guides/query-invalidation#query-matching-with-invalidatequeries
    ["inventory", { facilityId, productOptionId: optionId }],
    () =>
      api
        .getSupplierProductQuantity(facilityId, optionId)
        .then((response) => {
          let data = response.data;
          console.log(response.data);
          return {
            product_category: data.product_option.product_category,
            product_name: data.product_option.product_variation,
            product_label: data.product_option.option_label,
            product_parent: data.product_option.product,
            product_label_value: data.product_option.name,
            product_description: data.product_option.product_description,
            product_alloted: data.allotted_quantity,
            product_available: data.quantity,
            product_image: data.product_option.product_image,
            pk: data.product_option.pk,
          };
        })
        .catch((err) => console.log(err)),
    { disabled: !facilityId, staleTime: 0 }
  );
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-8">
      <LoadingSpinner darkened show={isLoading} />
      {productData && (
        <>
          <BackNavigation link={`Back`} />
          <TitleUnderLine
            title={`${
              productData.product_parent
                ? productData.product_parent + " - "
                : ""
            } ${productData.product_name}`}
          />
          <div className="w-full flex place-self-center justify-self-center m-auto">
            <ProductDetailsCard product={productData}>
              <EditProductForm
                matched={productData.product_alloted}
                avail={productData.product_available}
                id={productData.pk}
              />
            </ProductDetailsCard>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardProductDetail;
