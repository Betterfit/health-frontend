import { Auth } from "aws-amplify";
import ErrorDisplayForm, {
  SubmitCallback,
} from "Components/Forms/ErrorDisplayForm";
import InputField from "Components/Forms/InputField";
import SubtleLink from "Components/Forms/SubtleLink";
import VerificationCodeForm, {
  VerifyCodeCallback,
} from "Components/Forms/VerificationCodeForm";
import React, { useState } from "react";

interface CognitoLoginProps {
  onAuthenticate: () => void;
  signUpEnabled?: boolean;
  /** Users are allowed to skip login if this is specified. onAuthenticate will not be called*/
  continueWithoutPassword?: () => void;
}
const CognitoLogin = ({
  onAuthenticate,
  signUpEnabled = true,
  continueWithoutPassword = undefined,
}: CognitoLoginProps) => {
  const [user, setUser] = useState<any>();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signIn: SubmitCallback = async (notifyError) => {
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

  if (!user?.challengeName)
    return (
      <>
        <ErrorDisplayForm handleSubmit={signIn} submitLabel="Login">
          <InputField
            idTag="email"
            name="Email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputField
            idTag="password"
            name="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </ErrorDisplayForm>

        <div className="py-5 flex flex-col item-center">
          {continueWithoutPassword && (
            <SubtleLink
              text="Continue without login"
              onClick={continueWithoutPassword}
            />
          )}
          {signUpEnabled && <SubtleLink text="Sign up" path="/signup" />}
          <SubtleLink text="Forgot password?" path="/forgotpassword" />
        </div>
      </>
    );

  return <VerificationCodeForm verifyCode={confirmMFA} />;
};

export default CognitoLogin;