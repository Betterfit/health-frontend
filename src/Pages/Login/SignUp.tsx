import { useMyProfile } from "APIHooks/user";
import { Auth } from "aws-amplify";
import ErrorDisplayForm, {
  SubmitCallback,
} from "Components/Forms/ErrorDisplayForm";
import InputField from "Components/Forms/InputField";
import SubtleLink from "Components/Forms/SubtleLink";
import TypedAPI from "Helpers/typedAPI";
import { subset } from "Helpers/utils";
import React, { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { UserProfile } from "Types";

interface FormData {
  email: string;
  password: string;
  passwordConfirmation: string;
  code: string;
  firstName: string;
  lastName: string;
}

const api = new TypedAPI();
type Stage = "enterInfo" | "confirm" | "completeProfile" | "success";
const SignUp = () => {
  const history = useHistory();
  const [stage, setStage] = useState<Stage>("enterInfo");
  const myProfileQuery = useMyProfile({
    enabled: stage === "enterInfo" || stage === "confirm",
  });
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    passwordConfirmation: "",
    code: "",
    firstName: "",
    lastName: "",
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
        console.log(result);

        Auth.signIn(formData.email, formData.password).then(() =>
          setStage("completeProfile")
        );
      },
      (error) => {
        console.log(error);
        notifyError(error?.message, "");
      }
    );
  };
  const profileCompletionMutation = useMutation(
    (user: UserProfile) =>
      api.completeProfile(user.id, subset(formData, "firstName", "lastName")),
    {
      onSuccess: () => {
        setStage("success");
        history.push("/login");
      },
    }
  );
  const completeProfile: SubmitCallback = async (notifyError) => {
    if (myProfileQuery.isLoading) notifyError("Try again.", "");
    else if (!myProfileQuery.isSuccess) notifyError("Something went wrong", "");
    else {
      const user = myProfileQuery.data;
      profileCompletionMutation.mutate(user);
    }
  };

  return (
    <div>
      {stage === "enterInfo" && (
        <ErrorDisplayForm
          title="Sign Up"
          handleSubmit={signUp}
          subtitle="If your organization has created an account for you, you can set up your login credentials here"
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
      )}
      {stage === "confirm" && (
        <ErrorDisplayForm
          title="Verify Email"
          subtitle={`We've sent an email to ${formData.email} containing a confirmation code.`}
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
      {stage === "completeProfile" && (
        <ErrorDisplayForm
          title="Complete Your Profile"
          subtitle="We need a few more details about you so your coworkers can tell who you are."
          handleSubmit={completeProfile}
          submitLabel="Complete Profile"
        >
          <InputField
            name="First Name"
            type="text"
            value={formData.firstName}
            onChange={onChange("firstName")}
          />
          <InputField
            name="Last Name"
            type="text"
            value={formData.lastName}
            onChange={onChange("lastName")}
          />
        </ErrorDisplayForm>
      )}
      {stage === "success" && <p>Successfully signed up!</p>}
      <div className="py-5 flex flex-col item-center">
        <SubtleLink text="Back to Login" path="/login" />
      </div>
    </div>
  );
};

export default SignUp;
