import React, {useState,useEffect} from "react";
import { useObserver} from "mobx-react"
import Button from "Components/Forms/Button";
import { ReactSVG } from "react-svg";
import EmptyCart from "Images/Icons/shopping-cart-empty.svg";
import useStores from 'Helpers/useStores';
import Api from "Helpers/api";
import cartStore from "Store/modules/cart";
import {useCartStore} from "Context/cartContext";
const api = new Api();
const OrderCart =({Cart}) => {
  const cartStore = useCartStore();
  const products = null;
  return useObserver(() => (
    <>
      <div className="flex-grow flex flex-col justify-center">
      <div>{JSON.stringify(cartStore.cart)}</div>
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
  ));
};

export default OrderCart;
