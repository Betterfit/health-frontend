import React from "react";
import Button from "Components/Forms/Button";
import { ReactSVG } from "react-svg";
import EmptyCart from "Images/Icons/shopping-cart-empty.svg";
import useStores from 'Helpers/useStores';

const OrderCart = ({ products }) => {
  const { store } = useStores();
  return (
    <>
      <div className="flex-grow flex flex-col justify-center">
        {!products && (
            <>
            <ReactSVG
              src={EmptyCart}
              beforeInjection={(svg) => {
                svg.setAttribute("style", "display:block;margin:auto");
              }}
            ></ReactSVG>
            <p className="text-base text-betterfit-grey-blue text-center">
              No products added
            </p>
            </>
        )}
      </div>
      <div className="flex flex-row space-x-2">
        <Button text="Save Draft" solid={false} text_size="text-sm" />
        <Button text="Submit Order" text_size="text-sm" />
      </div>
    </>
  );
};

export default OrderCart;
