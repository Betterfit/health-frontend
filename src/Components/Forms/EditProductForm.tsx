import { useUserFacilities } from "APIHooks/facilities";
import Button from "Components/Forms/Button";
import QuantityInput from "Components/Forms/Quantity_Input";
import Api from "Helpers/api";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

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
  const [available, readAvailable] = useState(avail);
  const { data: facilities } = useUserFacilities();
  const facilityId =
    facilities && facilities.length > 0 ? facilities[0].id : null;
  const queryClient = useQueryClient();
  const inventoryMutation = useMutation(
    () => api.updateSupplierProductQuantity(facilityId, id, available),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["products"]);
      },
    }
  );
  return (
    <div className="flex flex-col mx-1 pt-2">
      <div className="py-2 flex justify-end">
        <QuantityInput name="Matched" value={matched} readOnly={true} />
      </div>
      <div className="py-2 flex justify-end">
        <QuantityInput
          name="Available"
          value={available}
          readValue={readAvailable}
          id_tag="Available"
          readOnly={!edit ? true : false}
        />
      </div>
      {edit && (
        <div className="py-2 md:py-8 md:mx-2">
          <Button
            onClick={() => inventoryMutation.mutate()}
            text="Save Changes"
            text_size="text-base"
          />
        </div>
      )}
    </div>
  );
};

const api = new Api();
export default EditProductForm;
