import React, { useState } from "react";
import Quantity_Input from "Components/Forms/Quantity_Input";
import Button from "Components/Forms/Button";
import UpdateQuantitySupplier from "Components/Helpers/UpdateQuantitySupplier";


const EditProductForm = ({ action, matched=0, avail=0 }) => {
  const [available, readAvailable] = useState(avail);
  const [quantityData, setQuantityData] = useState({
    id: "",
    data: "",
  });
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
          readValue={avail}
          quantityUpdate={(id, data) => setQuantityData({ id: id, data: data })}
          id_tag="Available"
        ></Quantity_Input>
      </div>
      <div className="py-2 md:py-8 md:mx-2">
        <Button
          onClick={() =>
            UpdateQuantitySupplier(quantityData.id, quantityData.data)
          }
          text="Save Changes"
          text_size="text-base"
        ></Button>
      </div>
    </div>
  );
};

export default EditProductForm;
