import { TextField } from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import SubtleLink from "Components/Forms/SubtleLink";
import { api } from "Helpers/typedAPI";
import { useQueryParams } from "Helpers/utils";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import LoginPageForm from "./LoginPageForm";
import RegistrationForm from "./OrganizationRegistration";
import UserRegistration from "./UserRegistration";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [form, setForm] = useState<"email" | "organization" | "user">("email");

  // automatically populate the email field and skip the 'enterEmail' stage when
  // the url looks like /signup?email=blah@domain.com.
  // This makes sign up from email invites more convenient.
  const urlEmail = useQueryParams().get("email");
  useEffect(() => {
    if (urlEmail !== null) {
      setEmail((oldEmail) => (oldEmail === "" ? urlEmail : oldEmail));
    }
  }, [urlEmail]);

  const userExistsMutation = useMutation((email: string) => {
    return api.userExists(email);
  });

  const createOrganization = () =>
    userExistsMutation.mutate(email, {
      onSuccess: (data) => {
        if (!data.userExists) setForm("organization");
        // the user probably meant to join an organization
        else setForm("user");
      },
    });
  const joinOrganization = () =>
    userExistsMutation.mutate(email, {
      onSuccess: (data) => {
        if (data.userExists) setForm("user");
        else
          setError(
            "This email has not been invited to an organization. " +
              "Did you mean to create a new one?"
          );
      },
    });

  if (form === "organization")
    return <RegistrationForm email={email} onSuccess={() => setForm("user")} />;
  else if (form === "user") return <UserRegistration email={email} />;

  return (
    <LoginPageForm
      title="Sign up"
      subtitle="Create a new organization, or join an existing one that you have been invited to."
      handleSubmit={joinOrganization}
      submitLabel="Join Existing Organization"
      extraActions={<SubtleLink text="Back to Login" path="/login" />}
      canSubmit={!userExistsMutation.isLoading}
    >
      <TextField
        label="Email"
        id="email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error != null}
        helperText={error}
        required
      />
      <PrettyButton
        text="Create New Organization"
        className="w-full"
        color="green"
        variant="outline"
        disabled={userExistsMutation.isLoading}
        onClick={createOrganization}
      />
    </LoginPageForm>
  );
};

export default SignUp;
