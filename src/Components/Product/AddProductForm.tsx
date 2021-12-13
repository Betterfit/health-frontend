import { TextField } from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import { ProductOption } from "Types";

const AddProductForm = ({ product }: { product: ProductOption }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.preferences.loggedIn);
  const history = useHistory();

  const addToCart = (quantity: number) => {
    if (loggedIn)
      dispatch(cartActions.addItem({ productOptionId: product.id, quantity }));
    else history.push("/login");
  };
  return (
    <div className="flex flex-col mx-1 items-center bg-betterfit-soft-blue p-4">
      {product.freeShipping && (
        <p className="font-bold text-lg text-lucky-green">Free Shipping</p>
      )}
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
