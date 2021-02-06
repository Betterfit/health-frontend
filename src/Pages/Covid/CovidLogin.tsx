import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool
} from "amazon-cognito-identity-js";
import LoginForm from "Components/Forms/LoginForm";
import LoginContainer from "Pages/Login/LoginContainer";
import React from "react";

interface CovidLoginProps {
  // authorize: () => void;
}
const CovidLogin = ({}: CovidLoginProps) => {
  return (
    <LoginContainer>
      <p className="text-center pb-8 text-2xl">COVID-19 Data Aggregator</p>
      <LoginForm signIn={authenticate} />;
    </LoginContainer>
  );
};

const authenticate = (userName: string, password: string) => {
  const authenticationData = {
    Username: userName,
    Password: password,
  };
  const authDetails = new AuthenticationDetails(authenticationData);
  const poolData = {
    UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID as string,
    ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID as string,
  };

  const userPool = new CognitoUserPool(poolData);

  const userData = {
    Username: "dev",
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  cognitoUser.authenticateUser(authDetails, {
    onSuccess: (result) => console.log(result),
    onFailure: (result) => console.log(result),
  });
};

export default CovidLogin;
