import Title from "Components/Content/Title";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import Notifications from "Components/Helpers/Notifications";
import React, { ReactNode } from "react";

export interface LoginPageFormProps {
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
  extraActions?: React.ReactNode;
}

const LoginPageForm = ({
  handleSubmit,
  subtitle,
  submitLabel = "Submit",
  title,
  children,
  canSubmit = true,
  error,
  extraActions,
}: LoginPageFormProps) => {
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    handleSubmit();
  };

  return (
    <div className="flex-1 flex flex-col justify-around h-full">
      {title && <Title>{title}</Title>}
      <form
        className="my-2 space-y-3 flex flex-col"
        onSubmit={onSubmit}
        aria-label={title || submitLabel}
      >
        {error && (
          <Notifications head={error.title} text={error.text} success={false} />
        )}
        {subtitle && (
          <p className="text-center leading-5 text-base mb-6">{subtitle}</p>
        )}
        {children}
        <PrettyButton
          className="w-full"
          text={submitLabel}
          disabled={!canSubmit}
          type="submit"
        />
        <div className="py-5 flex flex-col item-center mt-auto">
          {extraActions}
        </div>
      </form>
    </div>
  );
};

export default LoginPageForm;
