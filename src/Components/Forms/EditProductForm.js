import React, { useState } from "react";
import Quantity_Input from "Components/Forms/Quantity_Input";
import Button from "Components/Forms/Button";
import UpdateQuantitySupplier from "Components/Helpers/UpdateQuantitySupplier";


const EditProductForm = ({ id, matched=0, avail=0 , edit=true}) => {
  const [available, readAvailable] = useState(avail);
  let supplier_id = JSON.parse(localStorage.getItem("user")).user_profile?.supplier;
  return (
    <div className="flex flex-col mx-1 pt-2">
      <div className="py-2 flex justify-end">
        <Quantity_Input
          name="Matched"
          value={matched}
          readOnly={true}
        ></Quantity_Input>
      </div>
      <div className="py-2 flex justify-end">
        <Quantity_Input
          name="Available"
          value={available}
          readValue={readAvailable}
          id_tag="Available"
          readOnly={!edit ? true : false}
        ></Quantity_Input>
      </div>
      {edit && (
        <div className="py-2 md:py-8 md:mx-2">
          <Button
            onClick={() =>
              UpdateQuantitySupplier(supplier_id, id, available)
            }
            text="Save Changes"
            text_size="text-base"
          ></Button>
        </div>
      )}
    </div>
  );
};

export default EditProductForm;
