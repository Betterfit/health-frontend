import React, { useState } from "react";
import Button from "../Forms/Button";
import Inventory_Description from "../Inventory/Inventory_Description";
import Quantity_Input from "Components/Forms/Quantity_Input";
import UpdateQuantitySupplier from "Components/Helpers/UpdateQuantitySupplier";
import {useAuthStore} from "Context/authContext";
//This will either return the attribute if it exists, or
// return the passed in 'default_value' if not
const Read_Product = (product_attr, default_value) => {
  if (product_attr === undefined) {
    return default_value;
  }
  return product_attr;
};

//The html component for the product image
//If no image can be found - return nothing
const ProductImage = ({ product_image, product_name }) => {
  if (product_image === undefined || !product_image.hasOwnProperty("image")) {
    return null;
  }
  return (
    <div className="product_image bg-white rounded-lg m-2 w-5/12 md:w-auto">
      <img
        src={Read_Product(product_image.image, "")}
        alt={Read_Product(product_name + " Product Image", "Product Image")}
        loading="lazy"
        data-sizes="auto"
      ></img>
    </div>
  );
};

const Inventory = ({ product, edit }) => {
  const [available, readAvailble] = useState(
    Read_Product(product.product_available, 0)
  );
  const [quantityData,setQuantityData] = useState({
    id:"",
    data:""
  })
  const authStore = useAuthStore();
  const userData = JSON.parse(authStore.user);
  const supplierId = userData.user_profile.supplier;
  return (
    <>
      <div className="flex md:flex-row flex-col-reverse">
        <div className="md:w-2/3 md:pr-12 py-4 mx-2">
          <Inventory_Description
            title="Size"
            description={Read_Product(product.product_size, "N/A")}
            class_addons="pb-2"
          ></Inventory_Description>
          <Inventory_Description
            title="Description"
            class_addons="pb-2 pt-4"
            description={Read_Product(product.product_description, "")}
          ></Inventory_Description>
        </div>
        <div className="flex flex-row md:flex-col md:w-1/3 bg-betterfit-soft-blue rounded justify-center">
          <ProductImage
            product_name={product.product_name}
            product_image={product.product_image}
          />
          <div className="flex flex-col mx-1 pt-2">
            <div className="py-2 flex justify-end">
              <Quantity_Input
                name="Allotted"
                value={Read_Product(product.product_alloted, 0)}
                readOnly={true}
                id_tag="alloted"
              ></Quantity_Input>
            </div>
            <div className="py-2 flex justify-end">
              <Quantity_Input
                name="Available"
                value={available}
                readValue={readAvailble}
                quantityUpdate={(data) => setQuantityData({ id:product.pk,data:data.quantity})}
                id_tag={product.pk}
              ></Quantity_Input>
            </div>
            <div className="py-2 md:py-8 md:mx-2">
              <Button onClick={() => UpdateQuantitySupplier(supplierId,quantityData.id,quantityData.data)} text="Save Changes" text_size="text-base"></Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Inventory;
