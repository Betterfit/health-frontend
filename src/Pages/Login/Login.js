import React, { useState, useEffect } from "react";
import Input_Field from "Components/Forms/Input_Field";
import Api from "Helpers/api";
import Notfications from "Components/Helpers/Notifications";
import Button from "Components/Forms/Button";
import { useHistory, Route, useRouteMatch, Link } from "react-router-dom";
import {useAuthStore} from "Context/authContext";
import Translator from "Helpers/Translator";


const api = new Api();


const Login = () => {
  const authStore = useAuthStore();
  const [password, setPW] = useState("");
  const [email, setEmail] = useState("");
  const [Error, setError] = useState();
  const history = useHistory();


  useEffect(() => {   
    if(authStore.token){
      history.push("/dashboard/");
    }
    }, []);


  const signIn = (e) => {
    e.preventDefault();
    api
      .signIn({ username: email, password: password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        authStore.user = JSON.stringify(response.data.user);
        authStore.token = response.data.token;
        history.push("/dashboard/");

      })
      .catch((err) => {
        setError({
          head: "Unable to login",
          text: "please ensure your email and password are correct.",
        });
        console.log(err);
      });
  };
  return (
    <>
      {Error && (
        <Notfications
          head={Error.head}
          text={Error.text}
          success={false}
        ></Notfications>
      )}
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
            <Link
              className="font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150"
              to="/login/forgotpassword"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};



export default Login;
