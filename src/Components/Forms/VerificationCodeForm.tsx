import Button from "Components/Forms/Button";
import Notifications from "Components/Helpers/Notifications";
import React, { FormEvent, useState } from "react";
import InputField from "./InputField";

export type VerifyCodeCallback = (
  code: string,
  notifyError: () => void
) => void;
interface MFACodeFormProps {
  verifyCode: VerifyCodeCallback;
}
const VerificationCodeForm = ({ verifyCode }: MFACodeFormProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState({
    title: "",
    text: "",
    isSet: false,
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyCode(code, () =>
      setError({ title: "Invalid Code", text: "", isSet: true })
    );
  };

  return (
    <>
      {error.isSet && (
        <Notifications head={error.title} text={error.text} success={false} />
      )}
      <p className="text-center">Enter your verification code</p>
      <form className="pb-12" onSubmit={onSubmit}>
        <div>
          <InputField
            idTag="code"
            name="Code"
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          ></InputField>
        </div>
        <div className="mt-6">
          <div className="mt-6">
            <Button text="Confirm" solid={true} onClick={onSubmit} />
          </div>
        </div>
      </form>
    </>
  );
};

export default VerificationCodeForm;
