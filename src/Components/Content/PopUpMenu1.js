import React from "react";
import Button from "Components/Forms/Button";
import { Transition } from "@tailwindui/react";

  const PopupButton = (value, onClick) => {
    return (
      <form className="pt-2" method="POST" action="#">
        <Button
          text="Submit"
          color=" bg-betterfit-green"
          hoverColor="bg-green-800"
          text_size="text-sm"
          onClick = {onClick}
        ></Button>
      </form>
    );
  };

  export default PopupButton;







