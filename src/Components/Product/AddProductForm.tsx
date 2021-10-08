import { TextField } from "@material-ui/core";
import Button from "Components/Forms/Button";
import React, { useState } from "react";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch } from "Store/store";
import { ProductOption } from "Types";

const AddProductForm = ({ product }: { product: ProductOption }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const addToCart = (quantity: number) => {
    dispatch(cartActions.addItem({ productOptionId: product.id, quantity }));
  };
  return (
    <div className="flex flex-col mx-1 pt-2">
      <div className="py-1 lg:py-2 flex justify-center">
        <TextField
          id="quantity-input"
          label="Quantity"
          size="small"
          name="Quantity"
          value={quantity}
          type="number"
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          inputProps={{ min: 1 }}
          variant="outlined"
          style={{ width: "80px" }}
        />
      </div>
      <div className="py-1 lg:py-2  md:mx-2">
        <Button
          onClick={() => addToCart(quantity)}
          text="Add to Order"
          text_size="text-base"
        />
      </div>
    </div>
  );
};

export default AddProductForm;
