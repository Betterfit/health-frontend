import Auth from "@aws-amplify/auth";
import Button from "Components/Forms/Button";
import InputField from "Components/Forms/InputField";
import LoginForm, { SignInCallback } from "Components/Forms/LoginForm";
import Notifications from "Components/Helpers/Notifications";
import { useAuthStore } from "Context/authContext";
import Api from "Helpers/api";
import React, { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const api = new Api();

const Login = () => {
  // TODO: add typing to mobx
  const authStore = useAuthStore() as any;
  const history = useHistory();
  const [user, setUser] = useState<any>();
  if (authStore.user) history.push("/dashboard/");

  useEffect(() => {
    Auth.currentSession()
      .then((session) => getUserProfile())
      .catch((err) => console.log(err));
  }, []);

  const signIn: SignInCallback = async (email, password, notifyError) => {
    // authenticate with cognito
    let cognitoUser = null;
    try {
      cognitoUser = await Auth.signIn(email, password);
      setUser(cognitoUser);
      console.log(cognitoUser);
    } catch (error) {
      notifyError(error.message, "");
      console.log(error);
      return;
    }
    console.log("execution should stop");
    // once we have id token, we can get the user's profile from the django backend
    if (!cognitoUser?.challengeName) getUserProfile();

    // cognito login failed
  };

  const getUserProfile = () => {
    api.getProfile().then((response: { data: { user: any } }) => {
      localStorage.setItem("user", JSON.stringify(response.data.user));
      authStore.user = JSON.stringify(response.data.user);
      console.log(response);
      history.push("/dashboard/");
    });
  };

  // https://docs.amplify.aws/lib/auth/mfa/q/platform/js#sign-in-with-custom-auth-challenges
  const confirmMFA: VerifyCodeCallback = async (code, notifyError) => {
    try {
      const cognitoUser = await Auth.confirmSignIn(user, code);
      console.log(cognitoUser);
    } catch (error) {
      console.log(error);
      notifyError();
      return;
    }
    getUserProfile();
  };

  if (!user?.challengeName) return <LoginForm signIn={signIn} />;
  return <VerificationCodeForm verifyCode={confirmMFA} />;
};

type VerifyCodeCallback = (code: string, notifyError: () => void) => void;
interface MFACodeFormProps {
  verifyCode: VerifyCodeCallback;
}
const VerificationCodeForm = ({ verifyCode }: MFACodeFormProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState({
    title: "",
    text: "",
    isSet: false,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyCode(code, () =>
      setError({ title: "Invalid Code", text: "", isSet: true })
    );
  };

  return (
    <>
      {error.isSet && (
        <Notifications head={error.title} text={error.text} success={false} />
      )}
      <p>Enter your verification code</p>
      <form className="pb-12" onSubmit={onSubmit}>
        <div>
          <InputField
            idTag="code"
            name="Code"
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></InputField>
        </div>
        <div className="mt-6">
          <div className="mt-6">
            <Button text="Confirm" solid={true} onClick={onSubmit}></Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
