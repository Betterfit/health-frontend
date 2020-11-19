import React, { useState, useEffect } from "react";
import BackNavigation from "Components/Helpers/BackNavigation";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import Inventory from "Components/Inventory/Inventory";
import ProductDetailsCard from "Components/Content/ProductDetailsCard"
import image from "Images/example_product.png"; //remove this later
import Api from "Helpers/api";
import { set } from "js-cookie";
import Spinner from "Images/spinner.gif";
const api = new Api();

const DashboardProductDetail = (props) => {

  const { match } = props;
  const product_id = parseInt(match.params.pid);
  const product_details_id = parseInt(match.params.id);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState();
  const [isError, setIsError] = useState(false);
  const getData = async () =>
    await api
      .getProductVariant(product_id)
      .then((response) => {
        console.log(response.data);
        setProduct(CleanUpProduct(response.data, product_details_id));
        setIsError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
      });

  useEffect(() => {
    getData();
  }, []);

  const CleanUpProduct = (product, details_id) => {
    let product_options = product.product_options.find(
      (elem) => elem.pk == details_id
    );
    // console.log(product);
    const clean_product = {
      name: product.name,
      parent:product.product,
      product_parent: product.product,
      product_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
      product_size: product_options.name,
      product_parent:product.product,
      pk:product_options.pk
    };
    return clean_product;
  };
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 relative">
      {isLoading && (
        <div className="relative w-3/4 min-h-screen" style={{margin:'0 auto',}}> 
          <img className="absolute left-0 right-0 spinner" style={{maxWidth:150}} src={Spinner} />
        </div>
      )}
      {product && (
        <>
          <BackNavigation link={`Back to Products`} />
          <TitleUnderLine title={product.parent} />
          <div className="w-full flex place-self-center justify-self-center m-auto">
            <ProductDetailsCard product={product} />
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardProductDetail;
