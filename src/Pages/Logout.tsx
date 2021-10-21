import { signOut } from "Helpers/cognito";
import React from "react";
import { useQueryClient } from "react-query";
import { Redirect } from "react-router-dom";
import { preferencesActions } from "Store/preferencesSlice";
import { clearPersistedReduxState, useAppDispatch } from "Store/store";

const LogOut = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  // removes all cached query data
  queryClient.clear();
  signOut();
  clearPersistedReduxState();
  dispatch(preferencesActions.setLoggedIn(true));
  return <Redirect to="/login" />;
};

export default LogOut;
