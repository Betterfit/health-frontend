import clsx from "clsx";
import Title from "Components/Content/Title";
import DashboardSideBarInventory from "Components/DashboardSideBar/DashboardSideBarInventory";
import FacilitySelector from "Components/FacilitySelector";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import InventoryProductDetail from "Routes/Inventory/InventoryDetail";
import { preferencesActions } from "Store/preferencesSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import InventoryOverview from "./InventoryOverview";
import styles from "./InventoryPage.module.css";

const InventoryPage = () => {
  const match = useRouteMatch<{ productId: string }>(
    "/dashboard/inventory/:productId"
  );
  const productId = match?.params.productId;
  return (
    <div className="flex flex-wrap">
      <InventorySidebar productId={productId} />
      <div
        className={`relative w-full lg:w-1/2 mx-auto overflow-y-scroll h-screen p-2`}
      >
        {productId && (
          <InventoryProductDetail productOptionId={Number(productId)} />
        )}
      </div>
    </div>
  );
};

const InventorySidebar = ({ productId }: { productId?: string }) => {
  const dispatch = useAppDispatch();
  const facilityId = useAppSelector((state) => state.preferences.facilityId);
  return (
    <DashboardSideBarInventory
      addonStyles={clsx(
        "relative p-4",
        // if a product has been selected, then on small devices we will hide the sidebar
        productId != null && styles.minimizedSidebar
      )}
      width="1/2"
    >
      <Title>Inventory</Title>
      <FacilitySelector
        label="Warehouse"
        facilityId={facilityId}
        selectFacility={(id) => dispatch(preferencesActions.setFacilityId(id))}
      />
      <hr />
      <InventoryOverview />
    </DashboardSideBarInventory>
  );
};

export default InventoryPage;
