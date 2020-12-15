import ProductDetailsCard from "Components/Content/ProductDetailsCard";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import AddProductForm from "Components/Forms/AddProductForm";
//components
import BackNavigation from "Components/Helpers/BackNavigation";
import Api from "Helpers/api";
//images
import Spinner from "Images/spinner.gif";
import React, { useEffect, useState } from "react";

const api = new Api();

const DashboardProductDetail = (props) => {
  const { match } = props;
  const product_id = parseInt(match.params.pid);
  const product_details_id = parseInt(match.params.id);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();
  // eslint-ignore
  const [isError, setIsError] = useState(false);
  const getData = async () =>
    await api
      .getProductOption(product_details_id)
      .then((response) => {
        setProduct({
          product_category: response.data.product_category,
          product_name: response.data.product_variation,
          product_parent: response.data.product,
          product_label: response.data.option_label,
          product_label_value: response.data.name,
          product_description: response.data.product_description,
          product_image: response.data.product_image,
          pk: response.data.pk,
        });
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
      {isLoading && (
        <div
          className="relative w-3/4 min-h-screen"
          style={{ margin: "0 auto" }}
        >
          <img
            className="absolute left-0 right-0 spinner"
            style={{ maxWidth: 150 }}
            src={Spinner}
          />
        </div>
      )}
      {product && (
        <>
          <BackNavigation link={`Back to Products`} />
          <TitleUnderLine
            title={`${
              product.product_parent ? product.product_parent + " - " : ""
            } ${product.product_name}`}
          />
          <div className="w-full flex place-self-center justify-self-center m-auto">
            <ProductDetailsCard product={product}>
              <AddProductForm id={product.pk} product_pk={product_id} />
            </ProductDetailsCard>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardProductDetail;
