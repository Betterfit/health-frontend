import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Order } from "Types";

const initialState: CartItem[] = [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Because immer is a default middleware, all of these operations actually
    // keep the state immutable.
    // See here for some update patterns:
    // https://immerjs.github.io/immer/update-patterns/
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      // if there's already an item for this product, add the quantities
      const existing = state.find(
        (item) => item.productOptionId === newItem.productOptionId
      );
      if (existing) existing.quantity += newItem.quantity;
      else state.push(action.payload);
    },
    removeById: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.findIndex((item) => item.productOptionId === id);
      if (index !== -1) state.splice(index, 1);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ productOptionId: number; quantity: number }>
    ) => {
      const { productOptionId, quantity } = action.payload;
      const item = state.find(
        (item) => item.productOptionId === productOptionId
      );
      if (item) item.quantity = quantity;
    },
    importOrder: (state, action: PayloadAction<Order>) => {
      const order = action.payload;
      return order.orderProducts.map((op) => ({
        productOptionId: op.productOption.id,
        quantity: op.quantity,
      }));
    },
    // immer allows you to return a value as well
    clearCart: (state, action: PayloadAction<void>) => [],
  },
});

export const cartActions = cartSlice.actions;
