import { useAuthStore } from "Context/authContext";
import { signOut } from "Helpers/cognito";
import React from "react";
import { useHistory } from "react-router-dom";

const LogOut = () => {
  const authStore = useAuthStore();
  const history = useHistory();
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
  authStore.token = null;
  authStore.user = null;
  signOut();
  history.push("/login");
  return <div></div>;
};

export default LogOut;
