import React, { useState, useEffect } from "react";
import Input_Field from "Components/Forms/Input_Field";
import Api from "Helpers/api";
import InputFieldLabel from "Components/Forms/InputFieldLabel";
import Button from "Components/Forms/Button";
import Notification from "Components/Helpers/Notifications";

// Success/fail message that will show to user once
// they have submitted an email
const PasswordResetConfirmation = ({ success, email }) => {
  const email1 = email;
  let successMessage = `An email was sent to ${email1} with instructions to reset your password.`;
  let failMessage = `We were unable to find an account associated with ${email1}.`;
  const message = success ? successMessage : failMessage;
  return <p className="text-base leading-5 py-2 italic">{message}</p>;
};

const ResetPassword = () => {
  const intialPWValues = { newPW: "", confirmPW: "" };
  const [pwFormValues, setPWFormValues] = useState(intialPWValues);
  const [pwFormErrors, setPWFormErrors] = useState({});
  const [pwNotification, setPWNotification] = useState();

  //PW section form changes
  const handlePWChange = (e) => {
    const { id, value } = e.target;
    //clear any errors on input
    setPWNotification();
    setPWFormValues({ ...pwFormValues, [id]: value });
  };

  useEffect(() => {
    setPWFormErrors(validatePW(pwFormValues));
  }, [pwFormValues]);

  //Validate PW changes
  const validatePW = (values) => {
    let errors = {};
    //only run if any pw field has text
    if (values.newPW.length != 0 || values.confirmPW.length != 0) {
      if (values.newPW.length < 8) {
        errors.newPW = "Password must be more than 8 characters.";
      }
      if (values.newPW != values.confirmPW) {
        errors.confirmPW = "Set password' and 'Confirm password' must match.";
      }
    }
    return errors;
  };

  const api = new Api();

  const pwCallBack = async () => {
    let arrPWerrors = pwFormErrors;
    let arrPW = pwFormValues;

    //first ensure the pw section is set properly
    if (
      Object.keys(arrPWerrors).length > 0 ||
      Object.values(arrPW).reduce(
        (total, val) => (val === "" ? total + 1 : total + 0),
        0
      ) > 0
    ) {
      return;
    }
    const pwArr = {
      old_password: pwFormValues.oldPW,
      new_password: pwFormValues.newPW,
    };
    await api
      .changePassword(pwArr)
      .then((response) => {
        //update user token
        localStorage.setItem("token", response.data.token);
        setPWNotification({
          head: "Success",
          text: "Your password has been updated",
          value: true,
        });
      })
      .catch((error) => {
        setPWNotification({
          head: "Error",
          text:
            "There was an error updating your password. Please ensure you are entering your old password correctly.",
          value: false,
        });
        console.error("Error", error);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center py-3">
        <h1 className="text-gray-700 text-xl font-semibold pb-2">
          Reset Password
        </h1>
      </div>
      <form className="pb-24" onSubmit={pwCallBack}>
        <div>
          <InputFieldLabel
            id_tag="newPW"
            name="New Password"
            onChange={handlePWChange}
            value={pwFormValues.newPW}
            error={pwFormErrors.newPW}
            required={false}
            type="password"
          ></InputFieldLabel>
          <InputFieldLabel
            name="Confirm Password"
            id_tag="confirmPW"
            onChange={handlePWChange}
            value={pwFormValues.confirmPW}
            error={pwFormErrors.confirmPW}
            required={false}
            type="password"
          ></InputFieldLabel>
        </div>
        <div className="mt-6">
          <Button text="Reset Password"> </Button>
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
export default ResetPassword;
