import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";
import Api from "Helpers/api";
import TypedAPI, { api } from "Helpers/typedAPI";
import { useSelectedFacility } from "Models/facilities";
import { useOrganization } from "Models/organization";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { SupplierPricing } from "Types";
import PrettyButton from "./PrettyButton/PrettyButton";

const EditProductForm = ({
  id,
  matched = 0,
  avail = 0,
  edit = true,
}: {
  id: number;
  matched: number;
  avail: number;
  edit: boolean;
}) => {
  const [details, setDetails] = useState<{
    quantity: number;
    price: number;
    forSale: boolean;
  }>({
    forSale: false,
    quantity: avail,
    price: 0.05,
  });
  const { facilityId } = useSelectedFacility();
  const queryClient = useQueryClient();
  const organizationQuery = useOrganization();
  const organizationId = organizationQuery.data?.id;
  const inventoryMutation = useMutation(
    () =>
      new Api().updateSupplierProductQuantity(facilityId, id, details.quantity),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    }
  );
  const findPricing = useCallback(
    (prices?: SupplierPricing[]): SupplierPricing | undefined =>
      prices?.find(
        (item) =>
          item.productOptionId === id && item.organizationId === organizationId
      ),
    [organizationId, id]
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
        return api.addSupplierPricing({ ...data, productOption: id });
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
    if (!loading) {
      inventoryMutation.mutate();
      pricingMutation.mutate();
    }
  };
  return (
    <div className="my-1 flex flex-col gap-2 items-center">
      <TextField
        name="Matched"
        label="Matched"
        value={matched}
        disabled
        variant="outlined"
        size="small"
      />
      <TextField
        name="Available"
        label="Available"
        value={details.quantity}
        type="number"
        onChange={(e) =>
          setDetails({ ...details, quantity: parseInt(e.target.value) })
        }
        inputProps={{ min: 0 }}
        id="availableQuantityInput"
        disabled={!edit}
        variant="outlined"
        size="small"
      />
      <FormControlLabel
        control={
          <Switch
            checked={details.forSale}
            onChange={(e, forSale) => setDetails({ ...details, forSale })}
          />
        }
        label="For Sale"
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
          disabled={!edit}
          variant="outlined"
          size="small"
        />
      )}
      {edit && (
        <PrettyButton
          text="Save Changes"
          onClick={saveChanges}
          disabled={loading}
        />
      )}
    </div>
  );
};

export default EditProductForm;
