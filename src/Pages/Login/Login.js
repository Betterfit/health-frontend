import React, { useState } from "react";
import { ReactSVG } from "react-svg";
// store context hook
import useStores from 'Helpers/useStores';
// end store context hook
import Logo from "Images/logo.svg";
import LowerBackgroundBlob from "Images/Login/login_lower_right.svg";
import UpperBackgroundBlob from "Images/Login/login_upper_left.svg";
import Input_Field from "Components/Forms/Input_Field";
import Api from "Helpers/api";
import PasswordReset from "./PasswordReset";
// import Cookies from "js-cookie";
import Button from "Components/Forms/Button";
import { useHistory, Route, useRouteMatch } from "react-router-dom";

const LoginTemplate = () => {
  const { store } = useStores();
  const [password, setPW] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory();
  const api = new Api();
  const signIn = (e) => {
    e.preventDefault();
    console.log("sign in");
    api
      .signIn({ username: "lift", password: "L1f7is0wly!" })
      //.signIn({ username: email, password: password })
      .then((response) => {
        localStorage.setItem("token", response.data);
        history.push("/dashboard/inventory");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form className="pb-12" onSubmit={signIn}>
      <div>
        <Input_Field
          id_tag="email"
          name="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input_Field>
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
        ></Input_Field>
      </div>
      <div className="mt-6">
        <div className="mt-6">
          <Button text="Login" solid={true}></Button>
        </div>
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

const Login = () => {
  const match = useRouteMatch();

  return (
    <div className="min-h-screen bg-betterfit-basic-blue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <img
        src={UpperBackgroundBlob}
        role="presentation"
        className="absolute left-0 top-0 z-0"
      ></img>
      <img
        src={LowerBackgroundBlob}
        role="presentation"
        className="absolute right-0 bottom-0 z-0"
      ></img>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg z-50">
        <div className="bg-white px-12 m-2 sm:m-auto sm:w-5/6 shadow rounded-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-md pt-12 pb-10">
            <ReactSVG
              src={Logo}
              className=" px-2 mx-auto"
              beforeInjection={(svg) => {
                svg.setAttribute("style", "margin:auto;");
              }}
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
