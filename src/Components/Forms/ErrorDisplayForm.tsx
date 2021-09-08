import Button from "Components/Forms/Button";
import Notifications from "Components/Helpers/Notifications";
import React, { useState } from "react";

export type NotifyErrorCallback = (title: string, text: string) => void;
export type SubmitCallback = (
  /** Call this if the signing attempt fails to show an error message*/
  notifyError: NotifyErrorCallback
) => void;
interface ErrorDisplayFormProps {
  /** Callback that will be executed when the user submits the form*/
  handleSubmit: SubmitCallback;
  /** No title is shown if this prop is not given */
  title?: string;
  /** No subtitle is shown if this prop is not given */
  subtitle?: string;
  /** Text shown on the submit button */
  submitLabel?: string;
  /** Form input components should be passed in as children */
  children?: React.ReactNode;
}
/** Form wrapper that provides a callback to display error messages. */
const ErrorDisplayForm = ({
  handleSubmit,
  subtitle,
  submitLabel = "Submit",
  title,
  children,
}: ErrorDisplayFormProps) => {
  const [error, setError] = useState({
    title: "",
    text: "",
    isSet: false,
  });
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // clear out error after submit
    setError({ title: "", text: "", isSet: false });
    handleSubmit((title, text) => setError({ title, text, isSet: true }));
  };

  return (
    <>
      {title && (
        <div className="flex flex-col items-center">
          <h1 className="text-gray-700 text-xl font-semibold pb-2">{title}</h1>
        </div>
      )}
      {error.isSet && (
        <Notifications head={error.title} text={error.text} success={false} />
      )}
      <form
        className="pb-3 space-y-3"
        onSubmit={onSubmit}
        aria-label={title || submitLabel}
      >
        {subtitle && (
          <p className="text-center leading-5 text-base">{subtitle}</p>
        )}
        {children}
        <div className="mt-6">
          <Button text={submitLabel} solid={true} onClick={onSubmit} />
        </div>
      </form>
    </>
  );
};

export default ErrorDisplayForm;
