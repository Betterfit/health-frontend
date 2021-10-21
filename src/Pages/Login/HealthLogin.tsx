import React from "react";
import { useHistory } from "react-router-dom";
import { preferencesActions } from "Store/preferencesSlice";
import { useAppDispatch } from "Store/store";
import CognitoLogin from "./CognitoLogin";

const HealthLogin = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  return (
    <CognitoLogin
      onAuthenticate={() => {
        dispatch(preferencesActions.setLoggedIn(true));
        history.push("/dashboard");
      }}
    />
  );
};

export default HealthLogin;
