import { InputAdornment } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import TypedAPI, { api } from "Helpers/typedAPI";
import { useOrganization } from "Models/organization";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Inventory, SupplierPricing } from "Types";
import PrettyButton from "./PrettyButton/PrettyButton";

const EditProductForm = ({ inventory }: { inventory: Inventory }) => {
  const { productOptionId } = inventory;
  const [details, setDetails] = useState<{
    quantity: number;
    price: number;
    forSale: boolean;
  }>({
    forSale: false,
    quantity: inventory.quantity,
    price: 0.05,
  });
  const queryClient = useQueryClient();
  const organizationQuery = useOrganization();
  const organizationId = organizationQuery.data?.id;
  const inventoryMutation = useMutation(
    () =>
      api.updateInventory({
        warehouse: inventory.warehouseId,
        productOption: inventory.productOptionId,
        quantity: details.quantity,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["inventory"]);
      },
    }
  );
  const findPricing = useCallback(
    (prices?: SupplierPricing[]): SupplierPricing | undefined =>
      prices?.find(
        (item) =>
          item.productOptionId === productOptionId &&
          item.organizationId === organizationId
      ),
    [organizationId, productOptionId]
  );

  const pricingQuery = useQuery(["pricing"], () =>
    new TypedAPI().getSupplierPricing().then((response) => response.data)
  );

  // Cannot just be moved into onSuccess of pricingQuery because onSuccess does
  // not fire on cache hits
  useEffect(() => {
    const pricing = findPricing(pricingQuery.data);
    if (pricing)
      setDetails((old) => ({
        ...old,
        price: pricing.price,
        forSale: true,
      }));
  }, [pricingQuery.data, findPricing]);
  console.log("rerendered", details);

  const pricingMutation = useMutation(
    async () => {
      // either creates/updates/deletes pricing, or does nothing, depending on
      // form data and if a pricing object exists already
      if (!details.price) return;
      const data = { price: details.price, currency: "CAD" };
      const pricing = findPricing(pricingQuery.data);
      if (!pricing)
        return api.addSupplierPricing({
          ...data,
          productOption: productOptionId,
        });
      if (details.forSale) return api.updateSupplierPricing({ pricing, data });
      else return api.deleteSupplierPricing(pricing);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["pricing"]);
      },
    }
  );
  const loading = pricingMutation.isLoading || inventoryMutation.isLoading;
  const saveChanges = () => {
    inventoryMutation.mutate();
    pricingMutation.mutate();
  };
  return (
    <div className="mt-4 mb-2 flex flex-col space-y-4 items-center bg-betterfit-soft-blue p-4">
      <h3 className="mediumTitle">Edit Inventory/Price</h3>
      <FormControlLabel
        control={
          <Switch
            checked={details.forSale}
            onChange={(e, forSale) => setDetails({ ...details, forSale })}
          />
        }
        label="For Sale"
      />
      <TextField
        name="quantity"
        label="Total Stock"
        value={details.quantity}
        type="number"
        onChange={(e) =>
          setDetails({ ...details, quantity: parseInt(e.target.value) })
        }
        inputProps={{ min: 0 }}
        id="quantityInput"
        variant="outlined"
        style={{ width: "160px" }}
        size="small"
      />
      {details.forSale && (
        <TextField
          name="Price"
          label="Price"
          type="number"
          value={details.price}
          onChange={(e) =>
            setDetails({ ...details, price: parseFloat(e.target.value) })
          }
          inputProps={{ step: 0.01, min: 0.05 }}
          id="priceInput"
          variant="outlined"
          size="small"
          style={{ width: "160px" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      )}
      <PrettyButton
        text="Save Changes"
        onClick={saveChanges}
        disabled={loading}
      />
    </div>
  );
};

export default EditProductForm;
