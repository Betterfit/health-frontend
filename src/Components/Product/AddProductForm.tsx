import { TextField } from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
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
    <div className="flex flex-col mx-1 items-center bg-betterfit-soft-blue p-4">
      <p className="mb-4 font-bold text-lg">${product.price}</p>
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
      <PrettyButton
        onClick={() => addToCart(quantity)}
        color="green"
        text="Add to Cart"
      />
    </div>
  );
};

export default AddProductForm;
