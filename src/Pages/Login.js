import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import Logo from "Images/logo.svg";
import LowerBackgroundBlob from "Images/Login/login_lower_right.svg"
import UpperBackgroundBlob from "Images/Login/login_upper_left.svg"
import Input_Field from "Components/Forms/Input_Field";
import Api from "Helpers/api";
import Cookies from "js-cookie";
import Button from "../Components/Forms/Button";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  // usestate to save user and pass
  const [{ user, pass }, setAuthData] = useState({
    user: "",
    pass: "",
  });
  // PLAIN HTML WILL WORK , HOWEVER IN REACT WE WANT TO WRITING AND USING REUSABLE COMPONENTS! :D
  // WHENEVER YOU SEE SOMETHING AND THINK , HEY I COULD RE USE THIS IN SOME WAY , WRITE A COMPONENT , SOMETIMES YOU DON'T NEED TO BE WRITING 10000000 COMPONENTS SO KEEP THAT IN MIND AS WELL
  // WE ARE USING TAILWIND REACT UI IN THIS PROJECT , WHICH HAS TAILWIND REACT COMPONENTS THAT USE TAILWIND THAT ARE ALREADY MADE FOR US :D HERE IS THE LINK https://emortlock.github.io/tailwind-react-ui/#documentation
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
    <div class="min-h-screen bg-betterfit-basic-blue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <img src={ UpperBackgroundBlob } role="presentation" class="absolute left-0 top-0 z-0"></img>
    <img src={ LowerBackgroundBlob } role="presentation" class="absolute right-0 bottom-0 z-0"></img>
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-lg z-50">
        <div class="bg-white px-12 m-2 sm:m-auto sm:w-5/6 shadow rounded-lg">
          <div class="sm:mx-auto sm:w-full sm:max-w-md pt-12 pb-10">
            <ReactSVG
              src={Logo}
              className=" px-2 mx-auto"
              beforeInjection={(svg) => {
                svg.setAttribute("style", "margin:auto;");
              }}
            />
          </div>
          <form class="pb-12" action="#" method="POST">
            <div>
              <Input_Field id_tag="email" name="User"></Input_Field>
            </div>

            <div class="mt-3">
              <Input_Field
                id_tag="password"
                name="Password"
                type="password"
              ></Input_Field>
            </div>
            <div class="mt-6">
              <Button onClick={signIn} text="Login" solid={true}></Button>
            </div>
            <div class="mt-6 flex justify-center">
              <div class="text-base leading-5">
                <a
                  href="#"
                  onClick={signIn}
                  class="font-medium text-betterfit-basic-blue hover:text-betterfit-darker-blue focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
