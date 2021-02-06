import Button from "Components/Forms/Button";
import InputField from "Components/Forms/InputField";
import Notfications from "Components/Helpers/Notifications";
import Api from "Helpers/api";
import Translator from "Helpers/Translator";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const api = new Api();

interface LoginFormProps {
  signIn: (email: string, password: string) => void;
}
const LoginForm = ({ signIn }: LoginFormProps) => {
  const [password, setPW] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    head: null,
    text: null,
    isSet: false
  });

  const onSignIn = () => {
    signIn(email, password);
  };

  return (
    <>
      {error.isSet && (
        <Notfications
          head={error.head}
          text={error.text}
          success={false}
        ></Notfications>
      )}
      <form className="pb-12" onSubmit={onSignIn}>
        <div>
          <InputField
            idTag="email"
            name="Email"
            type="textbox"
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
            <Link
              className="font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150"
              to="/login/forgotpassword"
            >
              {Translator("Forgot password?")}
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
