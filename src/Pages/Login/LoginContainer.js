import LowerBackgroundBlob from "Images/Login/login_lower_right.svg";
import UpperBackgroundBlob from "Images/Login/login_upper_left.svg";
import Logo from "Images/logo.svg";
import React from "react";
import { ReactSVG } from "react-svg";

const LoginContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-betterfit-basic-blue flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <img
        src={UpperBackgroundBlob}
        role="presentation"
        className="absolute left-0 top-0 z-0"
      ></img>
      <img
        src={LowerBackgroundBlob}
        className="absolute right-0 bottom-0 z-0"
        alt=""
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
              alt="Betterfit"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
