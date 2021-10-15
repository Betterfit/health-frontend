import Icon from "Components/Content/Icon";
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

  if (!inventoryQuery.isSuccess)
    return <LoadingSpinner bubbleColor="gres_yashy" />;

  const inventory = inventoryQuery.data;
  const categories = Array.from(
    new Set(inventory.map((item) => item.productOption.productCategory))
  );

  return (
    <div className="space-y-5">
      {categories.map((category) => (
        <InventoryCategory
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
            <InventoryOverviewCard inventory={inventory} />
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
      to={`/dashboard/inventory/product/${inventory.productOptionId}`}
      // className={`text-dark-blue pl-4 pr-2 py-5 flex justify-between bg-white rounded-md box-link font-semibold`}
      className={styles.inventoryCard}
    >
      <img src={product.productImage} alt="" style={{ maxWidth: "64px" }} />
      <VerticalDetail
        label={productDisplayName(product)}
        labelClass="text-base"
        value={product.name}
        valueClass="text-sm"
        className="flex-1"
      />
      <VerticalDetail
        label="Total"
        value={inventory.quantity}
        className="ml-auto"
      />
      <VerticalDetail label="Committed" value={inventory.allottedQuantity} />
      <Icon name="navigate_next" extraClasses="ml-auto" />
    </NavLink>
  );
};

export default InventoryOverview;
