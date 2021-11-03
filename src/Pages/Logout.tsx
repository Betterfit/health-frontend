import { signOut } from "Helpers/cognito";
import React from "react";
import { useQueryClient } from "react-query";
import { Redirect } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { preferencesActions } from "Store/preferencesSlice";
import { clearPersistedReduxState, useAppDispatch } from "Store/store";

const LogOut = () => {
  const logout = useLogout();
  logout();
  return <Redirect to="/login" />;
};

const useLogout = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  return () => {
    // removes all cached query data
    queryClient.clear();
    signOut();
    clearPersistedReduxState();
    dispatch(preferencesActions.setLoggedIn(false));
    dispatch(preferencesActions.setFacilityId(undefined));
    dispatch(cartActions.clearCart());
  };
};
export default LogOut;
