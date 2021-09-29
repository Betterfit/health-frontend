import EmptyCartIcon from "Images/Icons/shopping-cart-empty.svg";
import React from "react";
import { ReactSVG } from "react-svg";
import { useAppSelector } from "Store/store";
import OrderProductCard from "./OrderProductCard";

const CartItemList = () => {
  const cartItems = useAppSelector((state) => state.cart);
  return (
    <div role="list" className="my-4 overflow-y-scroll p-4">
      {cartItems &&
        cartItems.length >= 1 &&
        cartItems.map((item) => {
          return (
            <OrderProductCard key={item.productOptionId} cartItem={item} />
          );
        })}
      {cartItems.length === 0 && <EmptyCart />}
    </div>
  );
};
const EmptyCart = () => (
  <>
    <ReactSVG
      src={EmptyCartIcon}
      beforeInjection={(svg) => {
        svg.setAttribute("style", "display:block;margin:auto");
      }}
    />
    <p className="text-base text-betterfit-graphite opacity-75 text-center">
      No products added
    </p>
  </>
);

export default CartItemList;
