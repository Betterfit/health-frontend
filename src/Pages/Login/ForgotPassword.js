import Button from "Components/Forms/Button";
import InputField from "Components/Forms/Input_Field";
import Api from "Helpers/api";
import Translator from "Helpers/Translator";
import React, { useState } from "react";

// Success/fail message that will show to user once
// they have submitted an email
const PasswordResetConfirmation = ({ success, email }) => {
  const email1 = email;
  let successMessage = `An email was sent to ${email1} with instructions to reset your password.`;
  let failMessage = `We were unable to find an account associated with ${email1}.`;
  const message = success ? successMessage : failMessage;
  return (
    <p className="text-base leading-5 py-2 italic">{Translator(message)}</p>
  );
};

const ForgotPassword = () => {
  const [sentEmail, setSendEmail] = useState("");
  const [showResults, setShowResults] = React.useState(undefined);
  const [email, setEmail] = useState("");
  const api = new Api();
  const resetPW = (e) => {
    e.preventDefault();
    api
      .passwordResetRequest({ email: email })
      .then((response) => {
        setSendEmail(email);
        //TODO pull out json response
        //setShowResults(response.data);
      })
      .catch((err) => {
        setSendEmail(email);
        setShowResults(false);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center py-3">
        <h1 className="text-gray-700 text-xl font-semibold pb-2">
          {Translator("Reset Password")}
        </h1>
        <p className="text-base leading-5">
          {Translator(
            `Please enter your email. If we find a matching account an email will be sent that allows you to reset your password`
          )}
        </p>
      </div>
      <form className="pb-24" onSubmit={resetPW}>
        <div>
          <label htmlFor="email" className="sr-only">
            {Translator(`Email`)}
          </label>
          <div className="relative">
            <InputField
              id_tag="email"
              name="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></InputField>
          </div>
        </div>
        {showResults !== undefined ? (
          <PasswordResetConfirmation success={showResults} email={sentEmail} />
        ) : null}
        <div className="mt-6">
          <Button text="Reset Password"> </Button>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="text-base leading-5">
            <a
              href="/login/"
              className="font-medium text-betterfit-graphite opacity-75 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              {Translator(`Back to Login`)}
            </a>
          </div>
        </div>
      </form>
    </>
  );
};
export default ForgotPassword;
