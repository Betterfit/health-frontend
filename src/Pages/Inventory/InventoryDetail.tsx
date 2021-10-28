import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import BackNavigation from "Components/Helpers/BackNavigation";
import ProductDetail from "Components/Product/ProductDetail";
import { useSelectedFacility } from "Models/facilities";
import { useInventory } from "Models/inventory";
import { productDisplayName } from "Models/products";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import styles from "./InventoryPage.module.css";

const InventoryDetail = ({ productOptionId }: { productOptionId: number }) => {
  const history = useHistory();
  const { facilityId } = useSelectedFacility();
  const inventoryQuery = useInventory({
    warehouse: facilityId,
    productOption: productOptionId,
  });

  if (!inventoryQuery.isSuccess) return <LoadingSpinner bubbleColor="gray" />;
  const inventory = inventoryQuery.data?.[0];
  if (inventory == null) return <Redirect to="/dashboard/inventory" />;

  return (
    <>
      <BackNavigation
        link="Back to Inventory Overview"
        className={styles.backNavigation}
        onClickOverride={() => history.push("/dashboard/inventory")}
      />
      <Title
        children={productDisplayName(inventory.productOption)}
        extraClasses="mt-6"
      />
      <hr />
      <div className="w-full flex place-self-center justify-self-center m-auto">
        <ProductDetail
          product={inventory.productOption}
          inventory={inventory}
        />
      </div>
    </>
  );
};

export default InventoryDetail;
