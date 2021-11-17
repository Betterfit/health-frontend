import clsx from "clsx";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import { VerticalDetail } from "Components/InfoDisplay/LabeledDetails";
import { api } from "Helpers/typedAPI";
import { useSelectedFacility } from "Models/facilities";
import { productDisplayName } from "Models/products";
import React from "react";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { Inventory } from "Types";
import styles from "./InventoryOverview.module.css";

const InventoryOverview = () => {
  const { facilityId } = useSelectedFacility();
  const inventoryParams = { warehouse: facilityId };
  const inventoryQuery = useQuery(
    ["inventory", { warehouse: facilityId }],
    () => api.getInventory(inventoryParams)
  );

  if (!inventoryQuery.isSuccess) return <LoadingSpinner bubbleColor="grey" />;

  const inventory = inventoryQuery.data;
  const categories = Array.from(
    new Set(inventory.map((item) => item.productOption.productCategory))
  );

  return (
    <div className="space-y-5">
      {categories.map((category) => (
        <InventoryCategory
          key={category}
          category={category}
          inventories={inventory.filter(
            (i) => i.productOption.productCategory === category
          )}
        />
      ))}
    </div>
  );
};

const InventoryCategory = ({
  category,
  inventories,
}: {
  category: string;
  inventories: Inventory[];
}) => {
  return (
    <div className="mt-2">
      <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body ml-4 uppercase font-bold tracking-wider">
        {category}
      </h3>
      <ul className="space-y-2">
        {inventories.map((inventory) => (
          <li>
            <InventoryOverviewCard key={inventory.id} inventory={inventory} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const InventoryOverviewCard = ({ inventory }: { inventory: Inventory }) => {
  const product = inventory.productOption;
  return (
    <NavLink
      to={`/dashboard/inventory/${inventory.productOptionId}`}
      // className={`text-dark-blue pl-4 pr-2 py-5 flex justify-between bg-white rounded-md box-link font-semibold`}
      className={clsx(styles.inventoryCard, "hoverGrow hoverShadow")}
    >
      <img src={product.productImage} alt="" style={{ maxWidth: "64px" }} />
      <VerticalDetail
        label={productDisplayName(product)}
        labelClass="text-sm md:text-base"
        value={product.name}
        valueClass="text-xs md:text-sm"
        className="flex-1"
        leftAlign
      />
      <VerticalDetail label="Total" value={inventory.quantity} />
      <VerticalDetail
        label="Committed"
        value={inventory.allottedQuantity}
        // we hide on sufficiently small displays
        className="ml-auto hidden md:flex"
      />
      <VerticalDetail
        label="Price"
        value={product.price ? "$" + product.price : "N/A"}
        // we hide on sufficiently small displays
        className="ml-auto hidden xl:flex"
      />
      {/* <Icon name="navigate_next" extraClasses="ml-auto" /> */}
    </NavLink>
  );
};

export default InventoryOverview;
