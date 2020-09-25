import React from "react";
import Button from "../Button";
import image from "../../Images/example_product.png";
import Inventory_Description from "../Inventory/Inventory_Description";

//This Read Product and the attribute if exists, or a default value
const Read_Product = (product_attr, default_value) => {
  if (product_attr === undefined) {
    return default_value;
  }
  return product_attr;
};

const Inventory = ({ product }) => {
  return (
    <>
      <div className="mb-4 bg-gray-100 p-5">
        <h1 className="text-gray-700 text-xl font-semibold">
          {Read_Product(product.product_name, "")}
        </h1>
        <div className="flex lg:flex-row flex-col-reverse">
          <div className="lg:w-7/12 pr-5">
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
            <div className="w-1/2 lg:grid lg:grid-cols-2 py-8">
              <h2 className="text-gray-700 text-2-5xl font-semibold col-span-2">
                Quantity
              </h2>
              <div className="col-span-1">
                <Inventory_Description
                  title="Allotted"
                  description={Read_Product(product.product_alloted, 0)}
                  class_addons="pb-3"
                ></Inventory_Description>
              </div>
              <div className="col-span-1">
                <Inventory_Description
                  title="Available"
                  description={Read_Product(product.product_available, 0)}
                  edit={true}
                ></Inventory_Description>
              </div>
              <div className="col-span-2 py-8">
                <Button text="Save Changes"></Button>
              </div>
            </div>
          </div>
          <div className="lg:w-5/12 m-auto">
            <img
              className="border border-gray-400"
              src={image}
              alt="Betterfit Logo"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};
export default Inventory;
