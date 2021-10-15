import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import ProductDetail from "Components/Product/ProductDetail";
import { useSelectedFacility } from "Models/facilities";
import { useInventory } from "Models/inventory";
import { productDisplayName } from "Models/products";
import React from "react";
import { Redirect } from "react-router-dom";

const InventoryDetail = ({ productOptionId }: { productOptionId: number }) => {
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
      <Title
        text={productDisplayName(inventory.productOption)}
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
