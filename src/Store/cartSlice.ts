import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Order } from "Types";

// change this when you want the local storage persisted state to be evicted
export const VERSION = 1;

interface CartState {
  items: CartItem[];
  destinationId?: number;
  orderId?: number;
  version: number;
  cartOpen: boolean;
}

const initialState = {
  items: [],
  version: VERSION,
  cartOpen: false,
} as CartState;

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
      const existing = state.items.find(
        (item) => item.productOptionId === newItem.productOptionId
      );
      if (existing) existing.quantity += newItem.quantity;
      else state.items.push(action.payload);
    },
    removeById: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.items.findIndex(
        (item) => item.productOptionId === id
      );
      if (index !== -1) state.items.splice(index, 1);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ productOptionId: number; quantity: number }>
    ) => {
      const { productOptionId, quantity } = action.payload;
      // remove item from cart if nonpositive quantity
      if (quantity < 1) {
        state.items = state.items.filter(
          (item) => item.productOptionId !== productOptionId
        );
        return;
      }
      const item = state.items.find(
        (item) => item.productOptionId === productOptionId
      );
      if (item) item.quantity = quantity;
    },
    importOrder: (state, action: PayloadAction<Order>) => {
      const order = action.payload;
      state.items = order.orderProducts.map((op) => ({
        productOptionId: op.productOption.id,
        quantity: op.quantity,
      }));
      state.destinationId = order.facility.id;
      state.orderId = order.id;
    },
    clearCart: (state, action: PayloadAction<void>) => {
      state.items = [];
      state.orderId = undefined;
      state.destinationId = undefined;
    },
    setDestinationId: (state, action: PayloadAction<number | undefined>) => {
      state.destinationId = action.payload;
    },
    setOrderId: (state, action: PayloadAction<number | undefined>) => {
      state.orderId = action.payload;
    },
    toggleCartOpen: (state) => {
      state.cartOpen = !state.cartOpen;
    },
  },
});

export const cartActions = cartSlice.actions;

/**
 * Returns the passed in state if it is valid, or the default initial state.
 * This is what allows us to purge the localstorage after updates.
 */
export const validateCartState = (state: any): CartState => {
  if (state?.version === VERSION) return state;
  return initialState;
};
