import { Auth } from "aws-amplify";
import ErrorDisplayForm, {
  SubmitCallback,
} from "Components/Forms/ErrorDisplayForm";
import InputField from "Components/Forms/InputField";
import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";

interface FormData {
  email: string;
  password: string;
  passwordConfirmation: string;
  code: string;
}

type Stage = "enter info" | "confirm" | "success";
const SignUp = () => {
  const history = useHistory();
  const [stage, setStage] = useState<Stage>("enter info");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    passwordConfirmation: "",
    code: "",
  });

  const onChange = (property: keyof FormData) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [property]: e.target.value });
  };

  const signUp: SubmitCallback = (notifyError) => {
    // simple validation here
    if (formData.password !== formData.passwordConfirmation) {
      notifyError("Passwords do not match", "");
      return;
    }

    Auth.signUp({
      username: formData.email,
      password: formData.password,
      attributes: {
        email: formData.email,
      },
    })
      .then((result) => setStage("confirm"))
      .catch((error) => notifyError(error.message, ""));
  };

  const confirmSignUp: SubmitCallback = (notifyError) => {
    Auth.confirmSignUp(formData.email, formData.code).then(
      (result) => {
        history.push("/login");
      },
      (error) => {
        console.log(error);
        notifyError(error?.message, "");
      }
    );
  };

  return (
    <div>
      {stage === "enter info" ? (
        <ErrorDisplayForm
          title="Sign Up"
          handleSubmit={signUp}
          submitLabel="Sign up"
        >
          <InputField
            name="Email"
            type="email"
            value={formData.email}
            onChange={onChange("email")}
            autoFocus
          />
          <InputField
            name="Password"
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
      ) : (
        <ErrorDisplayForm
          title="Verify Email"
          subtitle="Enter the code sent to your email to verify that this email belongs to you"
          handleSubmit={confirmSignUp}
          submitLabel="Verify Code"
        >
          <InputField
            name="Code"
            type="text"
            value={formData.code}
            onChange={onChange("code")}
          />
        </ErrorDisplayForm>
      )}
    </div>
  );
};

export default SignUp;
