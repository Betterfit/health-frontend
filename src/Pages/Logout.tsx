import { signOut } from "Helpers/cognito";
import React from "react";
import { useQueryClient } from "react-query";
import { Redirect } from "react-router-dom";
import { clearPersistedReduxState } from "Store/store";

const LogOut = () => {
  const queryClient = useQueryClient();
  // removes all cached query data
  queryClient.clear();
  signOut();
  clearPersistedReduxState();
  return <Redirect to="/login" />;
};

export default LogOut;
