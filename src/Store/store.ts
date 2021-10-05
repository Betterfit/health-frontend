import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { cartSlice, validatePersistedState } from "./cartSlice";

// read serializer state from local storage
const loadSavedState = () => {
  let rawState = localStorage.getItem("reduxState");
  const state = rawState ? JSON.parse(rawState) : {};
  return {
    cart: validatePersistedState(state?.cart),
  };
};

export const store = configureStore({
  reducer: { cart: cartSlice.reducer },
  devTools: true,
  preloadedState: loadSavedState(),
});

// saves redux state to local storage whenever it changes
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// normal redux hooks but with typing
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
