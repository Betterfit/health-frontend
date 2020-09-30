import React, { useState } from "react";
import logo from "Images/logo.png";
import Input_Field from "Components/Forms/Input_Field";
import Api from "Helpers/api";
import Cookies from "js-cookie";
import { useHistory, useParams, Route, useRouteMatch } from "react-router-dom";

const PasswordResetConfirmation = ({ success, email }) => {
    let successMessage =
    `An email was sent to ${email} with instructions to reset your password.`;
  let failMessage =
    `We were unable to find an account associated with ${email}`;
    const message = ({success} ? successMessage : failMessage);
  return (
        <p className="text-base leading-5">
            {message}
        </p>
  );
};
const PasswordReset = () => {
  const history = useHistory();
  const api = new Api();
  const resetPW = (e) => {
    e.preventDefault();
    console.log("Reset PW");
    api
      .signIn({ username: "lift", password: "L1f7is0wly!" })
      .then((response) => {
        Cookies.set("token", response.data.token);
        history.push("/dashboard/inventory");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="flex flex-col items-center py-3">
        <h1 className="text-gray-700 text-xl font-semibold pb-2">
          Reset Password
        </h1>
        <p className="text-base leading-5">
          Please enter your email. If we find a matching account an email will
          be sent that allows you to reset your password
        </p>
      </div>
      <form className="pb-24" action="#" method="POST">
        <div>
          <Input_Field id_tag="email" name="Email"></Input_Field>
        </div>

        <div className="mt-6">
          <span className="block w-full shadow-sm">
            <button
              onClick={resetPW}
              type="submit"
              className="w-full flex justify-center py-4 border border-transparent text-lg font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
            >
              Reset Password
            </button>
          </span>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="text-base leading-5">
            <a
              href="#"
              className="font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Back to Login
            </a>
          </div>
        </div>
      </form>
    </>
  );
};

const LoginTemplate = () => {
  const history = useHistory();
  const api = new Api();
  const signIn = (e) => {
    e.preventDefault();
    console.log("sign in");
    api
      .signIn({ username: "lift", password: "L1f7is0wly!" })
      .then((response) => {
        Cookies.set("token", response.data.token);
        history.push("/dashboard/inventory");
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className="pb-24" action="#" method="POST">
      <div>
        <Input_Field id_tag="email" name="Email"></Input_Field>
      </div>

      <div className="mt-3">
        <Input_Field
          id_tag="password"
          name="Password"
          type="password"
        ></Input_Field>
      </div>
      <div className="mt-6">
        <span className="block w-full shadow-sm">
          <button
            onClick={signIn}
            type="submit"
            className="w-full flex justify-center py-4 border border-transparent text-lg font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
          >
            Login
          </button>
        </span>
      </div>
      <div className="mt-6 flex justify-center">
        <div className="text-base leading-5">
          <a
            href="#"
            onClick={signIn}
            className="font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </form>
  );
};

const Login = ({ match }) => {
  let { path, url } = useRouteMatch();

  // usestate to save user and pass
  const [{ user, pass }, setAuthData] = useState({
    user: "",
    pass: "",
  });
  // PLAIN HTML WILL WORK , HOWEVER IN REACT WE WANT TO WRITING AND USING REUSABLE COMPONENTS! :D
  // WHENEVER YOU SEE SOMETHING AND THINK , HEY I COULD RE USE THIS IN SOME WAY , WRITE A COMPONENT , SOMETIMES YOU DON'T NEED TO BE WRITING 10000000 COMPONENTS SO KEEP THAT IN MIND AS WELL
  // WE ARE USING TAILWIND REACT UI IN THIS PROJECT , WHICH HAS TAILWIND REACT COMPONENTS THAT USE TAILWIND THAT ARE ALREADY MADE FOR US :D HERE IS THE LINK https://emortlock.github.io/tailwind-react-ui/#documentation

  console.log("path", path);
  console.log("url", url);
  console.log("url", Route);

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white px-20 shadow rounded-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-md pt-20 pb-10">
            <img
              className="mx-auto h-20 w-auto"
              src={logo}
              alt="Bettefit Logo"
            />
          </div>
          <PasswordResetConfirmation success = {true}  email="testemail@gmail.com"></PasswordResetConfirmation>
        </div>
      </div>
    </div>
  );
};

export default Login;
