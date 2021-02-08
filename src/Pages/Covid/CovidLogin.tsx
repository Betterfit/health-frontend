import Amplify, { Auth } from "aws-amplify";
import LoginForm from "Components/Forms/LoginForm";
import LoginContainer from "Pages/Login/LoginContainer";
import React from "react";

const cognitoConfig = {
  region: process.env.REACT_APP_COGNITO_REGION as string,
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID as string,
  clientId: process.env.REACT_APP_COGNITO_CLIENT_ID as string,
};


Amplify.configure({
  Auth: {
    region: cognitoConfig.region,
    userPoolId: cognitoConfig.userPoolId,
    userPoolWebClientId: cognitoConfig.clientId,
  },
});

interface CovidLoginProps {
  onAuthenticate: () => void;
}
const CovidLogin = ({ onAuthenticate }: CovidLoginProps) => {
  return (
    <LoginContainer>
      <p className="text-center pb-8 text-2xl">COVID-19 Data Aggregator</p>
      <LoginForm signIn={authenticate(onAuthenticate)} />;
    </LoginContainer>
  );
};

const authenticate = (onAuthenticate: () => void) => (
  userName: string,
  password: string
) => {
  Auth.signIn(userName, password).then(async () => {
    onAuthenticate()
  });
};

export default CovidLogin;
