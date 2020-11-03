import React from "react";
import Button from "Components/Forms/Button";

  const ButtonOption = ({value, onClick}) => {
    return (
        <Button
          text={value}
          color=" bg-betterfit-green"
          hoverColor="bg-green-800"
          text_size="text-sm"
          onClick = {onClick}
        ></Button>
    );
  };

  export default ButtonOption;







