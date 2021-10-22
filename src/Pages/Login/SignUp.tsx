import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { Auth } from "aws-amplify";
import TermsOfService from "Components/Content/TermsOfService";
import ErrorDisplayForm, {
  SubmitCallback,
} from "Components/Forms/ErrorDisplayForm";
import InputField from "Components/Forms/InputField";
import SubtleLink from "Components/Forms/SubtleLink";
import TypedAPI from "Helpers/typedAPI";
import { subset, useQueryParams } from "Helpers/utils";
import { useMyProfile } from "Models/user";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { preferencesActions } from "Store/preferencesSlice";
import { UserProfile } from "Types";
import LoginPageForm from "./LoginPageForm";
import styles from "./SignUp.module.css";

interface FormData {
  email: string;
  password: string;
  passwordConfirmation: string;
  code: string;
  firstName: string;
  lastName: string;
  termsAccepted: boolean;
}

const api = new TypedAPI();
type Stage =
  | "enterEmail"
  | "enterInfo"
  | "confirm"
  | "completeProfile"
  | "success";
const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [stage, setStage] = useState<Stage>("enterEmail");
  //   we can only make an authenticate request after these stages
  const myProfileQuery = useMyProfile({
    enabled:
      stage !== "enterEmail" && stage !== "enterInfo" && stage !== "confirm",
  });
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    passwordConfirmation: "",
    code: "",
    firstName: "",
    lastName: "",
    termsAccepted: false,
  });

  // automatically populate the email field and skip the 'enterEmail' stage when
  // the url looks like /signup?email=blah@domain.com.
  // This makes sign up from email invites more convenient.
  const urlEmail = useQueryParams().get("email");
  useEffect(() => {
    if (urlEmail !== null)
      setFormData((old) => ({
        ...old,
        email: old.email === "" ? urlEmail : old.email,
      }));
    setStage((stage) => (stage === "enterEmail" ? "enterInfo" : stage));
  }, [urlEmail]);

  const checkEmailMutation = useMutation(async () => {
    const userExists = await api.userExists(formData.email);
    if (!userExists) throw new Error("");
    else setStage("enterInfo");
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

        Auth.signIn(formData.email, formData.password).then(() => {
          setStage("completeProfile");
        });
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
        myProfileQuery.invalidate();
        dispatch(preferencesActions.setLoggedIn(true));
        history.push("/dashboard");
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
      {stage === "enterEmail" && (
        <>
          <LoginPageForm
            title="Sign up"
            handleSubmit={checkEmailMutation.mutate}
            submitLabel="Continue"
            canSubmit={formData.email !== ""}
          >
            <TextField
              label="Email"
              id="email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={onChange("email")}
              error={checkEmailMutation.isError}
              helperText={
                checkEmailMutation.isError &&
                "Hmmm, it looks like that email hasn't been invited to Supply Net."
              }
            />
            {checkEmailMutation.isError && (
              <p className="text-center">
                Want to add your organization to Supply Net?{" "}
                <a
                  href="https://betterfit.com/apply-now/"
                  className="font-bold hover:text-underline"
                >
                  Click here to apply.
                </a>
              </p>
            )}
          </LoginPageForm>
        </>
      )}
      {stage === "enterInfo" && (
        <ErrorDisplayForm
          title="Sign Up"
          handleSubmit={signUp}
          submitLabel="Sign up"
          canSubmit={
            formData.termsAccepted &&
            formData.password !== "" &&
            formData.email !== ""
          }
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
          <TermsOfService />
          <FormControlLabel
            className={styles.agreeToTerms}
            control={
              <Checkbox
                value={formData.termsAccepted}
                onChange={(e) =>
                  setFormData({ ...formData, termsAccepted: e.target.checked })
                }
                data-testid="agree-to-terms"
              />
            }
            label="Agree to Terms"
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
