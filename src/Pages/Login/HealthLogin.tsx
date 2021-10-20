import Auth from "@aws-amplify/auth";
import Api from "Helpers/api";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import CognitoLogin from "./CognitoLogin";

const api = new Api();

const HealthLogin = () => {
  // TODO: add typing to mobx
  const history = useHistory();

  const getUserProfile = () =>
    api.getProfile().then((response: { data: { user: any } }) => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
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
