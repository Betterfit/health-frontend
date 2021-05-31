import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { NotifyErrorCallback } from "./ErrorDisplayForm";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("Triggers the sign in callback with user input", () => {
    const signInMock = jest.fn();
    render(<LoginForm signIn={signInMock} />);
    const email = "email@domain.co";
    const password = "dummyPa$$word";
    enterCredentials(email, password);
    expect(signInMock).toHaveBeenCalledTimes(1);
    expect(signInMock.mock.calls[0][0]).toBe(email);
    expect(signInMock.mock.calls[0][1]).toBe(password);
  });

  it("Shows errors when error callback is called", () => {
    const errorTitle = "Validation Failed";
    const errorText = "Your password was incorrect";
    const signInCallback = (
      email: string,
      password: string,
      notifyError: NotifyErrorCallback
    ) => {
      notifyError(errorTitle, errorText);
    };

    render(<LoginForm signIn={signInCallback} />);
    enterCredentials("abc@abc.com", "password");
    screen.getByText(errorTitle);
    screen.getByText(errorText);
  });

  const enterCredentials = (email: string, password: string) => {
    userEvent.type(getEmailInput(), email);
    userEvent.type(getPasswordInput(), password);
    userEvent.click(getSubmitButton());
  };

  const getEmailInput = () => screen.getByRole("textbox", { name: /email/i });
  const getPasswordInput = () => screen.getByLabelText(/password/i);
  const getSubmitButton = () => screen.getByRole("button", { name: /login/i });
});
