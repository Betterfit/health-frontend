import Auth from "@aws-amplify/auth";
import { useAuthStore } from "Context/authContext";
import typedAPI from "Helpers/typedAPI";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import CognitoLogin from "./CognitoLogin";

const api = new typedAPI();

const HealthLogin = () => {
  // TODO: add typing to mobx
  const authStore = useAuthStore() as any;
  const history = useHistory();
  if (authStore.user) history.push("/dashboard/");

  const getUserProfile = () =>
    api.getProfile().then((response: { data: { user: any } }) => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      authStore.user = JSON.stringify(response.data.user);
      console.log(response);
      history.push("/dashboard/");
    });

  useEffect(() => {
    Auth.currentSession()
      .then((session) => getUserProfile())
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CognitoLogin onAuthenticate={getUserProfile} />;
};

export default HealthLogin;
