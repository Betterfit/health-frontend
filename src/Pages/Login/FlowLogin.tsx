import { Auth } from "aws-amplify";
import LoginForm, { SignInCallback } from "Components/Forms/LoginForm";
import LoginContainer from "Pages/Login/LoginContainer";
import React from "react";

interface FlowLoginProps {
  onAuthenticate: () => void;
  text: string;
}
const FlowLogin = ({ onAuthenticate, text }: FlowLoginProps) => {
  const authenticate: SignInCallback = (email, password, notifyError) =>
    Auth.signIn(email, password)
      .catch((err) =>
        notifyError(
          "Unable to login",
          "Please ensure your email and password are correct"
        )
      )
      .then(async () => onAuthenticate());
  return (
    <LoginContainer>
      <p className="text-center pb-8 text-2xl">{text}</p>
      <LoginForm signIn={authenticate} />;
    </LoginContainer>
  );
};

export default FlowLogin;
