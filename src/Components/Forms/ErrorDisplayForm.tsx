import React, { useState } from "react";
import LoginPageForm, { LoginPageFormProps } from "Routes/Login/LoginPageForm";

export type NotifyErrorCallback = (title: string, text?: string) => void;
export type SubmitCallback = (
  /** Call this if the signing attempt fails to show an error message*/
  notifyError: NotifyErrorCallback
) => void;
interface ErrorDisplayFormProps
  extends Omit<LoginPageFormProps, "handleSubmit"> {
  /** Callback that will be executed when the user submits the form.
   * Provides its own callback function to notify the user of an error.
   */
  handleSubmit: SubmitCallback;
}
/** Form wrapper that provides a callback to display error messages. */
const ErrorDisplayForm = ({
  handleSubmit,
  ...props
}: ErrorDisplayFormProps) => {
  const [error, setError] = useState({
    title: "",
    text: "",
    isSet: false,
  });
  const onSubmit = () => {
    // clear out error after submit
    setError({ title: "", text: "", isSet: false });
    handleSubmit((title, text = "") => setError({ title, text, isSet: true }));
  };

  return (
    <LoginPageForm
      handleSubmit={onSubmit}
      error={error.title !== "" ? error : undefined}
      {...props}
    />
  );
};

export default ErrorDisplayForm;
