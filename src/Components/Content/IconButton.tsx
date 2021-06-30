import React, { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "blue" | "red" | "green";
  iconName: string;
}
const IconButton = ({ color, iconName, ...props }: IconButtonProps) => {
  return (
    <button
      aria-label={iconName}
      className={`material-icons-outlined ${styles[color]}`}
      {...props}
    >
      {iconName}
    </button>
  );
};

export default IconButton;
