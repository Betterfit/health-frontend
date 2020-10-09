import React, { useState } from "react";
import Input_Field from "Components/Forms/Input_Field";
import Api from "Helpers/api";

// Success/fail message that will show to user once
// they have submitted an email
const PasswordResetConfirmation = ({ success, email }) => {
  const email1 = email;
  let successMessage = `An email was sent to ${email1} with instructions to reset your password.`;
  let failMessage = `We were unable to find an account associated with ${email1}.`;
  const message = success ? successMessage : failMessage;
  return <p className="text-base leading-5 py-2 italic">{message}</p>;
};

const PasswordReset = () => {
  const [sentEmail, setSendEmail] = useState("");
  const [showResults, setShowResults] = React.useState(undefined);
  const [email, setEmail] = useState("");
  const api = new Api();
  const resetPW = (e) => {
    console.log("Reset PW");
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
          Reset Password
        </h1>
        <p className="text-base leading-5">
          Please enter your email. If we find a matching account an email will
          be sent that allows you to reset your password
        </p>
      </div>
      <form className="pb-24" onSubmit={resetPW}>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <div className="relative">
            <Input_Field
              id_tag="email"
              name="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></Input_Field>
          </div>
        </div>
        {showResults !== undefined ? (
          <PasswordResetConfirmation success={showResults} email={sentEmail} />
        ) : null}
        <div className="mt-6">
          <span className="block w-full shadow-sm">
            <button

              type="submit"
              className="w-full flex justify-center py-4 border border-transparent text-lg font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out uppercase"
            >
              Reset Password
            </button>
          </span>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="text-base leading-5">
            <a
              href="/login/"
              className="font-medium text-gray-600 hover:text-gray-700 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Back to Login
            </a>
          </div>
        </div>
      </form>
    </>
  );
};
export default PasswordReset;
