import { TextField } from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import React, { useState } from "react";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch } from "Store/store";
import { ProductOption } from "Types";
import Icon from "Components/Content/Icon";
import styles from "./AddProductForm.module.css";
import clsx from "clsx";

const AddProductForm = ({ product }: { product: ProductOption }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const addToCart = (quantity: number) => {
    dispatch(cartActions.addItem({ productOptionId: product.id, quantity }));
  };
  return (
    <div className="flex flex-col mx-1 items-center bg-betterfit-soft-blue p-4">
      {product.freeShipping && (
        <p className="font-bold text-lg text-lucky-green">Free Shipping</p>
      )}
      <p className="mb-4 font-bold text-lg">${product.price}</p>
      {product.quantity > 10 && (
        <p className="text-green-500 text-sm">Available</p>
      )}
      {product.quantity <= 10 && product.quantity > 0 && (
        <p className="text-betterfit-grey-blue text-sm">
          <span className="text-status-dark-blue font-semibold">
            {product.quantity}
          </span>
          {" left in stock"}
        </p>
      )}
      {product.quantity <= 0 && (
        <p className="text-red-500 text-sm">Out of stock</p>
      )}
      {product.quantity > 0 && (
        <>
          <TextField
            id="quantity-input"
            label="Quantity"
            size="small"
            name="Quantity"
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            inputProps={{
              min: 1,
              max:
                product.quantity <= 10 && product.quantity > 0
                  ? product.quantity
                  : null,
            }}
            variant="outlined"
            style={{ width: "80px", marginTop: "20px" }}
          />
          <PrettyButton
            className="mt-4"
            onClick={() => addToCart(quantity)}
            color="green"
            text="Add to Cart"
          />
        </>
      )}
      <a
        href="mailto:info@betterfit.com"
        className={clsx(styles.mailtoButton, "btn btn-primary")}
      >
        <Icon name="mail" extraClasses="my-auto" />
        <p className="m-2 font-bold">Inquire about stock</p>
      </a>
    </div>
  );
};

export default AddProductForm;
