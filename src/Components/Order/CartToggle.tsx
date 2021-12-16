import React from "react";
import Icon from "Components/Content/Icon";
import { useAppSelector } from "Store/store";

const OrderCartToggle = ({
  cartOpen,
  toggleCart,
}: {
  cartOpen: boolean;
  toggleCart: () => void;
}) => {
  const cartItems = useAppSelector((state) => state.cart.items);

  return (
    <div className="flex flex-row pl-4 pb-8 pr-2 pt-4 md:pb-3 py-3">
      <Icon
        extraClasses="mt-2 mr-3 text-betterfit-graphite"
        name="shopping_cart"
        size="medium"
      />
      <span className="text-betterfit-graphite text-3xl">Your Cart</span>
      <span className="ml-2 text-betterfit-graphite font-bold">
        {cartItems.length > 0 ? cartItems.length : ""}
      </span>
      <Icon
        name={cartOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        size="medium"
        extraClasses="cursor-pointer ml-auto p-2 rounded-full bg-white"
        onClick={toggleCart}
      />
    </div>
  );
};
export default OrderCartToggle;
