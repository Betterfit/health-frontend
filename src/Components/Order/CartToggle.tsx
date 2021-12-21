import Icon from "Components/Content/Icon";
import IconButton from "Components/Content/IconButton";
import React from "react";
import { useAppSelector } from "Store/store";

const OrderCartToggle = ({
  cartOpen,
  toggleCart,
}: {
  cartOpen: boolean;
  toggleCart: () => void;
}) => {
  const cartSize = useAppSelector((state) => state.cart.items.length);

  return (
    <div className="flex items-center pl-4 pb-8 pr-2 pt-4 md:pb-3 py-3">
      <Icon
        extraClasses="mr-3 text-betterfit-graphite"
        name="shopping_cart"
        size="medium"
      />
      <span className="text-betterfit-graphite text-2xl">Cart</span>
      <span className="ml-2 text-betterfit-graphite font-bold">
        {cartSize > 0 ? cartSize : ""}
      </span>
      <IconButton
        iconName={cartOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        size="md"
        className="ml-auto p-2 rounded-full bg-white"
        onClick={toggleCart}
        aria-label="open cart"
      />
    </div>
  );
};
export default OrderCartToggle;
