import React, { useState, useEffect } from "react";
import BackNavigation from "Components/Helpers/BackNavigation";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import Table from "Components/Table/Basic/Table";
import Api from "Helpers/api";
import { useAuthStore } from "Context/authContext";
const api = new Api();

const DashboardProductList = (props) => {
  const { match } = props;
  const ProductId = parseInt(match.params.id);
  const authStore = useAuthStore();
  const userData = JSON.parse(authStore.user);
  const supplierId = userData.user_profile.supplier;
  const [lastProductId, setLastProductId] = useState(ProductId);
  const [ProductData, setProductData] = useState(null);

  const getData = async () =>
    await api
      .getProductsBySupplier(ProductId)
      .then((response) => {
        let arr = response.data;
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

        setProductData(arr);
      })
      .catch((err) => console.log(err));


  useEffect(() => {
    if (lastProductId !== ProductId || !ProductData) {
      setLastProductId(ProductId);
      getData();
    }
  });

  return (
    <>
      {ProductData && (
        <div className="lg:max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
          {/* product title */}
          <div className="lg:hidden">
            <BackNavigation link="Back to products" />
          </div>

          <div className="pt-8 md:pt-12">
            <TitleUnderLine title={`${ProductData.name}`} />
            {/* product description */}
            <p className="text-paragraph">{ProductData.description}</p>
            {ProductData.product_variations.map((product) => {
              return <Table TableData={product} ProductId={ProductId} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardProductList;
