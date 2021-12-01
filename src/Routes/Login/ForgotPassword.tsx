import Auth from "@aws-amplify/auth";
import Button from "Components/Forms/Button";
import ErrorDisplayForm, {
  SubmitCallback,
} from "Components/Forms/ErrorDisplayForm";
import InputField from "Components/Forms/InputField";
import Translator from "Helpers/Translator";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";

type FormData = {
  email: string;
  code: string;
  password: string;
  passwordConfirmation: string;
};

type Stage = "email" | "code" | "success";
const ForgotPassword = () => {
  const history = useHistory();
  const [stage, setStage] = useState<Stage>("email");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    code: "",
    password: "",
    passwordConfirmation: "",
  });
  const onChange = (property: keyof FormData) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [property]: e.target.value });
  };

  // https://docs.amplify.aws/lib/auth/manageusers/q/platform/js
  const resetPW = () => {
    Auth.forgotPassword(formData.email).then((data) => {
      console.log(data);
      setStage("code");
    });
  };
  const confirmResetPW: SubmitCallback = (notifyError) => {
    // simple validation here
    if (formData.password !== formData.passwordConfirmation) {
      notifyError("Passwords do not match", "");
      return;
    }
    Auth.forgotPasswordSubmit(
      formData.email,
      formData.code,
      formData.password
    ).then(
      (result) => {
        console.log(result);
        setStage("success");
      },
      (error) => {
        console.log(error);
        notifyError(error?.message, "");
      }
    );
  };

  if (stage === "success")
    return (
      <>
        <div className="flex flex-col items-center py-6">
          <h1 className="text-gray-700 text-xl font-semibold pb-6">
            {Translator("Successfully changed password")}
          </h1>
          <Button
            text={"Back to login page"}
            onClick={() => history.push("/login")}
          />
        </div>
      </>
    );

  return (
    <>
      {stage === "email" ? (
        <ErrorDisplayForm
          title="Forgot Password"
          subtitle="Enter your email address to recieve a verification code."
          handleSubmit={resetPW}
          submitLabel="Reset Password"
        >
          <InputField
            name="Email"
            type="email"
            value={formData.email}
            onChange={onChange("email")}
          />
        </ErrorDisplayForm>
      ) : (
        <ErrorDisplayForm
          title="Reset Password"
          subtitle="Enter the verification code that was emailed to you and choose a new password"
          handleSubmit={confirmResetPW}
          submitLabel="Confirm"
        >
          <InputField
            name="Code"
            type="text"
            value={formData.code}
            onChange={onChange("code")}
          />

          <InputField
            name="New Password"
            type="password"
            value={formData.password}
            onChange={onChange("password")}
          />
          <InputField
            name="Confirm Password"
            type="password"
            value={formData.passwordConfirmation}
            onChange={onChange("passwordConfirmation")}
          />
        </ErrorDisplayForm>
      )}
      <div className="py-6 flex justify-center">
        <a
          href="/login/"
          className="font-medium text-betterfit-graphite opacity-75 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          {Translator(`Back to Login`)}
        </a>
      </div>
    </>
  );
};

export default ForgotPassword;
