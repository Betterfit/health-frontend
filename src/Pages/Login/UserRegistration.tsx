import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { Auth } from "aws-amplify";
import TermsOfService from "Components/Content/TermsOfService";
import ErrorDisplayForm, {
  SubmitCallback,
} from "Components/Forms/ErrorDisplayForm";
import InputField from "Components/Forms/InputField";
import SubtleLink from "Components/Forms/SubtleLink";
import TypedAPI from "Helpers/typedAPI";
import { subset } from "Helpers/utils";
import { useMyProfile } from "Models/user";
import React, { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { preferencesActions } from "Store/preferencesSlice";
import { UserProfile } from "Types";
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
type Stage = "enterInfo" | "confirm" | "completeProfile" | "success";
const UserRegistration = ({ email }: { email: string }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [stage, setStage] = useState<Stage>("enterInfo");
  //   we can only make an authenticate request after these stages
  const myProfileQuery = useMyProfile({
    enabled: stage !== "enterInfo" && stage !== "confirm",
  });
  const [formData, setFormData] = useState<FormData>({
    email,
    password: "",
    passwordConfirmation: "",
    code: "",
    firstName: "",
    lastName: "",
    termsAccepted: false,
  });
  const { data: userExists } = useQuery(["userExists", email], () =>
    api.userExists(email)
  );

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
      username: email,
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
    <>
      {stage === "enterInfo" && (
        <ErrorDisplayForm
          title="Sign Up"
          handleSubmit={signUp}
          subtitle={"Set up your account as a member of " + userExists?.orgName}
          submitLabel="Sign up"
          canSubmit={
            formData.termsAccepted &&
            formData.password !== "" &&
            formData.email !== ""
          }
          extraActions={<SubtleLink text="Back to Login" path="/login" />}
        >
          <TextField
            label="Email"
            id="email"
            type="email"
            variant="outlined"
            value={formData.email}
            inputProps={{ readOnly: true }}
          />
          <TextField
            label="Password"
            id="password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={onChange("password")}
            helperText="Must be at least 8 characters, including a number, symbol and uppercase character."
          />
          <TextField
            label="Confirm Password"
            id="confirm password"
            type="password"
            variant="outlined"
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
    </>
  );
};

export default UserRegistration;
