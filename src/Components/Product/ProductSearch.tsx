import SearchBar from "Components/Search/SearchBar";
import {
  setProductNavInfo,
  useProductNavInfo,
} from "Containers/Facility/Inner/ProductList";
import React from "react";
import { useHistory } from "react-router-dom";

const ProductSearch = () => {
  const history = useHistory();
  const productNavInfo = useProductNavInfo();

  return (
    <SearchBar
      msDelay={1000 * 30}
      startingText={productNavInfo.search}
      placeholderText="Search Products"
      performSearch={(text) =>
        setProductNavInfo(history, { ...productNavInfo, search: text })
      }
    />
  );
};

export default ProductSearch;
