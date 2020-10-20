import React, { useState } from "react";
import Quantity_Input from "Components/Forms/Quantity_Input";
import Checkbox from "Components/Forms/Checkbox";
import Button from "Components/Forms/Button";

const AddProductForm = ({addToCart}) => {
  const [priority, setPriority] = useState();
  const [quantity, getQuantity] = useState(5);
  return (
    <>
      <div className="flex flex-col mx-1 lg:pt-2 w-1/2 lg:w-auto justify-end">
        <div className="py-1 lg:py-2 flex lg:justify-end ">
          <Quantity_Input name="Quantity" value={quantity} readValue={getQuantity}  />
        </div>
        <div className="py-1 lg:py-2  flex lg:justify-end">
          <Checkbox name="Stat" value={priority} setValue = {setPriority}/>
        </div>
        <div className="py-1 lg:py-2  md:mx-2">
        <Button onClick={() => addToCart() } text="Add to Order" text_size="text-base" />
      </div>
      </div>

    </>
  );
};

export default AddProductForm;
