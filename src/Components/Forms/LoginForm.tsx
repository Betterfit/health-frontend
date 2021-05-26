import InputField from "Components/Forms/InputField";
import React, { useState } from "react";
import ErrorDisplayForm, {
  NotifyErrorCallback,
  SubmitCallback,
} from "./ErrorDisplayForm";
import SubtleLink from "./SubtleLink";

export type SignInCallback = (
  email: string,
  password: string,
  /** Call this if the signin attempt fails to show an error message*/
  notifyError: NotifyErrorCallback
) => void;
interface LoginFormProps {
  /** Callback that will be executed when the user submits the login form*/
  signIn: SignInCallback;
  signUpEnabled?: boolean;
}
/**
 * Reusable login form that can display error messages to the user
 */
const LoginForm = ({ signIn, signUpEnabled = true }: LoginFormProps) => {
  const [password, setPW] = useState("");
  const [email, setEmail] = useState("");
  const onSignIn: SubmitCallback = (notifyError) => {
    signIn(email, password, notifyError);
  };

  return (
    <>
      <ErrorDisplayForm handleSubmit={onSignIn}>
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
            setPW(e.target.value);
          }}
        />
      </ErrorDisplayForm>

      <div className="mt-6 flex flex-col item-center">
        {signUpEnabled && <SubtleLink text="Sign up" path="/signup" />}
        <SubtleLink text="Forgot password?" path="/forgotpassword" />
      </div>
    </>
  );
};

export default LoginForm;
