import Button from "Components/Forms/Button";
import QuantityInput from "Components/Forms/Quantity_Input";
import UpdateQuantitySupplier from "Components/Helpers/UpdateQuantitySupplier";
import React, { useState } from "react";

const EditProductForm = ({ id, matched = 0, avail = 0, edit = true }) => {
  const [available, readAvailable] = useState(avail);
  let supplier_id = JSON.parse(localStorage.getItem("user")).user_profile
    ?.supplier;
  return (
    <div className="flex flex-col mx-1 pt-2">
      <div className="py-2 flex justify-end">
        <QuantityInput
          name="Matched"
          value={matched}
          readOnly={true}
        ></QuantityInput>
      </div>
      <div className="py-2 flex justify-end">
        <QuantityInput
          name="Available"
          value={available}
          readValue={readAvailable}
          id_tag="Available"
          readOnly={!edit ? true : false}
        ></QuantityInput>
      </div>
      {edit && (
        <div className="py-2 md:py-8 md:mx-2">
          <Button
            onClick={() => UpdateQuantitySupplier(supplier_id, id, available)}
            text="Save Changes"
            text_size="text-base"
          ></Button>
        </div>
      )}
    </div>
  );
};

export default EditProductForm;
