import { Auth } from "aws-amplify";
import LoginForm, { SignInCallback } from "Components/Forms/LoginForm";
import VerificationCodeForm, {
  VerifyCodeCallback,
} from "Components/Forms/VerificationCodeForm";
import React, { useState } from "react";

interface CognitoLoginProps {
  onAuthenticate: () => void;
}
const CognitoLogin = ({ onAuthenticate }: CognitoLoginProps) => {
  // TODO: add typing to mobx
  const [user, setUser] = useState<any>();

  const signIn: SignInCallback = async (email, password, notifyError) => {
    // authenticate with cognito
    let cognitoUser = null;
    try {
      cognitoUser = await Auth.signIn(email, password);
      setUser(cognitoUser);
      console.log(cognitoUser);
    } catch (error) {
      notifyError(error.message, "");
      console.log(error);
      return;
    }
    if (!cognitoUser?.challengeName) onAuthenticate();
  };

  const confirmMFA: VerifyCodeCallback = async (code, notifyError) => {
    try {
      const cognitoUser = await Auth.confirmSignIn(user, code);
      console.log(cognitoUser);
    } catch (error) {
      console.log(error);
      notifyError();
      return;
    }
    onAuthenticate();
  };

  if (!user?.challengeName) return <LoginForm signIn={signIn} />;
  return <VerificationCodeForm verifyCode={confirmMFA} />;
};

export default CognitoLogin;
