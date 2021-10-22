import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import Notifications from "Components/Helpers/Notifications";
import React, { ReactNode } from "react";

interface LoginPageFormProps {
  /** Callback that will be executed when the user submits the form*/
  handleSubmit: () => void;
  /** No title is shown if this prop is not given */
  title?: string;
  /** No subtitle is shown if this prop is not given */
  subtitle?: ReactNode;
  /** Text shown on the submit button */
  submitLabel?: string;
  /** Form input components should be passed in as children */
  children?: React.ReactNode;
  /** Form submit will be disabled if false */
  canSubmit?: boolean;
  error?: { title?: string; text?: string };
}

const LoginPageForm = ({
  handleSubmit,
  subtitle,
  submitLabel = "Submit",
  title,
  children,
  canSubmit = true,
  error,
}: LoginPageFormProps) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    handleSubmit();
  };

  return (
    <>
      {title && (
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-semibold pb-2">{title}</h1>
        </div>
      )}
      <form
        className="my-2 space-y-3 flex flex-col"
        onSubmit={onSubmit}
        aria-label={title || submitLabel}
      >
        {error && (
          <Notifications head={error.title} text={error.text} success={false} />
        )}
        {subtitle && (
          <p className="text-center leading-5 text-base">{subtitle}</p>
        )}
        {children}
        <div className="flex">
          <PrettyButton
            className="flex-1 justify-center"
            text={submitLabel}
            disabled={!canSubmit}
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default LoginPageForm;
