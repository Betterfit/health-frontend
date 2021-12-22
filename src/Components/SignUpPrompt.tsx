import EmptyImage from "Images/emptyImage.png";
import React from "react";
import { useHistory } from "react-router-dom";
import PrettyButton from "./Forms/PrettyButton/PrettyButton";

const SignUpToProceed = () => {
  const history = useHistory();
  return (
    <div className="dialog">
      <h2>Signup or Login to Continue</h2>
      <p className="px-2 text-center">
        Sign up now to order from our catalog of hundreds of competitively
        priced products.
      </p>
      <img src={EmptyImage} alt="" style={{ width: "300px" }} />
      <div className="dialogActions">
        <PrettyButton
          onClick={() => {
            history.push("/signup");
          }}
          text="Sign up"
        />
        <PrettyButton
          onClick={() => {
            history.push("/login");
          }}
          text="Login"
          variant="outline"
        />
      </div>
    </div>
  );
};

export default SignUpToProceed;
