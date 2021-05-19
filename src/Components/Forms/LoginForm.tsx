import Button from "Components/Forms/Button";
import InputField from "Components/Forms/InputField";
import Notifications from "Components/Helpers/Notifications";
import Translator from "Helpers/Translator";
import React, { useState } from "react";

export type SignInErrorCallback = (title: string, text: string) => void;
export type SignInCallback = (
  email: string,
  password: string,
  /** Call this if the signing attempt fails to show an error message*/
  notifyError: SignInErrorCallback
) => void;
interface LoginFormProps {
  /** Callback that will be executed when the user submits the login form*/
  signIn: SignInCallback;
}
/**
 * Reusable login form that can display error messages to the user
 */
const LoginForm = ({ signIn }: LoginFormProps) => {
  const [password, setPW] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    title: "",
    text: "",
    isSet: false,
  });

  const onSignIn = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signIn(email, password, (title, text) => {
      setError({ title, text, isSet: true });
    });
  };

  return (
    <>
      {error.isSet && (
        <Notifications
          head={error.title}
          text={error.text}
          success={false}
        ></Notifications>
      )}
      <form className="pb-12" onSubmit={onSignIn}>
        <div>
          <InputField
            idTag="email"
            name="Email"
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></InputField>
        </div>
        <div className="mt-3">
          <InputField
            idTag="password"
            name="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPW(e.target.value);
            }}
          ></InputField>
        </div>
        <div className="mt-6">
          <div className="mt-6">
            <Button text="Login" solid={true} onClick={onSignIn}></Button>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="text-base leading-5">
            <a
              className="font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150"
              href="/forgotpassword"
            >
              {Translator("Forgot password?")}
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
