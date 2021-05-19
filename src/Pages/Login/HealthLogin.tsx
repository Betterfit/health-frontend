import LoginForm, { SignInCallback } from "Components/Forms/LoginForm";
import { useAuthStore } from "Context/authContext";
import Api from "Helpers/api";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const api = new Api();

const Login = () => {
  // TODO: add typing to mobx
  const authStore = useAuthStore() as any;
  const history = useHistory();

  useEffect(() => {
    if (authStore.token) {
      history.push("/dashboard/");
    }
  }, []);

  const signIn: SignInCallback = (email, password, notifyError) => {
    api
      .signIn({ username: email, password: password })
      .then((response: { data: { token: string; user: any } }) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        authStore.user = JSON.stringify(response.data.user);
        authStore.token = response.data.token;
        history.push("/dashboard/");
      })
      .catch((err: Error) => {
        notifyError(
          "Unable to login",
          "Please ensure your email and password are correct."
        );
        console.log(err);
      });
  };
  return <LoginForm signIn={signIn} />;
};

export default Login;
