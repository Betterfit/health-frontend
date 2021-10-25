import Title from "Components/Content/Title";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import FacilitySelector from "Components/FacilitySelector";
import InventoryProductDetail from "Pages/Inventory/InventoryDetail";
import React from "react";
import { Route } from "react-router-dom";
import { preferencesActions } from "Store/preferencesSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import InventoryOverview from "./InventoryOverview";

const InventoryPage = () => {
  return (
    <div className="flex flex-wrap">
      <InventorySidebar />
      <InventoryDetail />
    </div>
  );
};

const InventorySidebar = () => {
  const dispatch = useAppDispatch();
  const facilityId = useAppSelector((state) => state.preferences.facilityId);
  return (
    <DashboardSideBar addonStyles="relative p-4">
      <Title>Inventory</Title>
      <FacilitySelector
        label="warehouse"
        facilityId={facilityId}
        selectFacility={(id) => dispatch(preferencesActions.setFacilityId(id))}
      />
      <hr />
      <InventoryOverview />
    </DashboardSideBar>
  );
};

const InventoryDetail = () => {
  return (
    <div
      className={`absolute w-full lg:relative lg:w-3/5 mx-auto overflow-y-scroll bg-white`}
    >
      <Route
        path="/dashboard/inventory/:id"
        exact
        render={({ match }) => {
          return <InventoryProductDetail productOptionId={match.params?.id} />;
        }}
      />
    </div>
  );
};

export default InventoryPage;
