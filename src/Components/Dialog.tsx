import { Dialog as MuiDialog, DialogProps } from "@material-ui/core";
import React from "react";

// simple reexport for when we move away from mui
const Dialog = (props: DialogProps) => {
  return <MuiDialog {...props} />;
};

export default Dialog;
