import { useQueryParams } from "Helpers/utils";
import React from "react";
import { useHistory } from "react-router-dom";
import { preferencesActions } from "Store/preferencesSlice";
import { useAppDispatch } from "Store/store";
import CognitoLogin from "./CognitoLogin";

const HealthLogin = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const redirect = useQueryParams().get("redirect");
  return (
    <CognitoLogin
      onAuthenticate={() => {
        dispatch(preferencesActions.setLoggedIn(true));
        history.push(redirect ? redirect : "/dashboard");
      }}
    />
  );
};

export default HealthLogin;
