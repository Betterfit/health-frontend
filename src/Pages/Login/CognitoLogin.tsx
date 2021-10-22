import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Auth } from "aws-amplify";
import Icon from "Components/Content/Icon";
import SubtleLink from "Components/Forms/SubtleLink";
import VerificationCodeForm, {
  VerifyCodeCallback,
} from "Components/Forms/VerificationCodeForm";
import { isServerException, ServerException } from "Helpers/cognito";
import { api } from "Helpers/typedAPI";
import React, { useState } from "react";
import { useMutation } from "react-query";
import LoginPageForm from "./LoginPageForm";

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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>();

  const signIn = async () => {
    // authenticate with cognito
    const userExists = await api.userExists(email);
    console.log("userExists", userExists);
    if (!userExists) {
      setError("This email hasn't been added to an organization yet");
      return;
    }
    const signInPromise = Auth.signIn(email, password);
    let cognitoUser = null;
    try {
      cognitoUser = await signInPromise;
    } catch (error) {
      if (isServerException(error)) {
        if (error.code === "UserNotFoundException")
          setError("Please sign up to set up your credentials");
        else setError((error as ServerException).message);
      }
      return;
    }
    setUser(cognitoUser);
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

  const signInMutation = useMutation(signIn);

  if (!user?.challengeName)
    return (
      <>
        <LoginPageForm
          handleSubmit={() => signInMutation.mutate()}
          submitLabel="Login"
          canSubmit={!signInMutation.isLoading}
          error={error ? { title: error } : undefined}
        >
          <TextField
            label="Email"
            id="email"
            variant="outlined"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="Password"
            id="password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              // toggle reveal password butto,n
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {
                      <Icon
                        name={showPassword ? "visibility_off" : "visibility"}
                      />
                    }
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </LoginPageForm>

        <div className="py-5 flex flex-col item-center">
          {continueWithoutPassword && (
            <SubtleLink
              text="Continue without login"
              onClick={continueWithoutPassword}
            />
          )}
          {signUpEnabled && <SubtleLink text="Sign up" path="/signup" />}
          <SubtleLink text="Forgot password?" path="/forgotpassword" />
          <SubtleLink
            text="Apply to join Supply Net"
            onClick={() =>
              (window.location.href = "https://betterfit.com/apply-now/")
            }
          />
        </div>
      </>
    );

  return <VerificationCodeForm verifyCode={confirmMFA} />;
};

export default CognitoLogin;
