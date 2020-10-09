import React, { useState } from "react";
import logo from "Images/logo.png";
import Input_Field from "Components/Forms/Input_Field";
import Api from "Helpers/api";
import Cookies from "js-cookie";
import PasswordReset from "./PasswordReset";
import { useHistory, Route, useRouteMatch } from "react-router-dom";

const LoginTemplate = () => {
  const [password, setPW] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();
  const api = new Api();
  const signIn = (e) => {
    e.preventDefault();
    console.log("sign in");
    api
      .signIn({  username: "lift", password: "L1f7is0wly!" }) 
      //.signIn({ username: email, password: password })
      .then((response) => {
        Cookies.set("token", response.data.token);
        history.push("/dashboard/inventory");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="pb-24" onSubmit={signIn}>
      <div>
        <Input_Field 
          id_tag="email"
          name="Email"
          value={email}
          onChange={(e) => {
                setEmail(e.target.value);
              }}
        >
        </Input_Field>
      </div>
      <div className="mt-3">
        <Input_Field
          id_tag="password"
          name="Password"
          type="password"
          value={password}
          onChange={(e) => {
                setPW(e.target.value);
              }}
        >
        ></Input_Field>
      </div>
      <div className="mt-6">
        <span className="block w-full shadow-sm">
          <button
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
            href={history.location.pathname + "forgotpassword"}
            className="font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </form>
  );
};

const Login = ({}) => {
  const match = useRouteMatch();

  // PLAIN HTML WILL WORK , HOWEVER IN REACT WE WANT TO WRITING AND USING REUSABLE COMPONENTS! :D
  // WHENEVER YOU SEE SOMETHING AND THINK , HEY I COULD RE USE THIS IN SOME WAY , WRITE A COMPONENT , SOMETIMES YOU DON'T NEED TO BE WRITING 10000000 COMPONENTS SO KEEP THAT IN MIND AS WELL
  // WE ARE USING TAILWIND REACT UI IN THIS PROJECT , WHICH HAS TAILWIND REACT COMPONENTS THAT USE TAILWIND THAT ARE ALREADY MADE FOR US :D HERE IS THE LINK https://emortlock.github.io/tailwind-react-ui/#documentation

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
          <Route path={match.url + "/forgotpassword"}>
            <PasswordReset />
          </Route>
          <Route exact path="/login">
            <LoginTemplate />
          </Route>
        </div>
      </div>
    </div>
  );
};

export default Login;
