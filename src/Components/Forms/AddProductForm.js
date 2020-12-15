import Button from "Components/Forms/Button";
import Checkbox from "Components/Forms/Checkbox";
import QuantityInput from "Components/Forms/Quantity_Input";
import { useCartStore } from "Context/cartContext";
import React, { useState } from "react";

const AddProductForm = ({ id, product_pk }) => {
  const [priority, setPriority] = useState();
  const [quantity, getQuantity] = useState(1);
  const cartStore = useCartStore();
  const addToCart = (quantity, priority) => {
    cartStore.addToCart(id, quantity, priority ? priority : null, product_pk);
  };
  return (
    <div className="flex flex-col mx-1 pt-2">
      <div className="py-1 lg:py-2 flex lg:justify-end ">
        <QuantityInput
          name="Quantity"
          value={quantity}
          readValue={getQuantity}
        />
      </div>
      <div className="py-1 lg:py-2  flex lg:justify-end">
        <Checkbox name="Stat" value={priority} setValue={setPriority} />
      </div>
      <div className="py-1 lg:py-2  md:mx-2">
        <Button
          onClick={() => addToCart(quantity, priority)}
          text="Add to Order"
          text_size="text-base"
        />
      </div>
    </div>
  );
};

export default AddProductForm;
