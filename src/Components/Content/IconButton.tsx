import React from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps {
  color: "blue" | "red" | "green";
  iconName: string;
}
const IconButton = ({ color, iconName }: IconButtonProps) => {
  return (
    <button
      aria-label={iconName}
      className={`material-icons-outlined ${styles[color]}`}
    >
      {iconName}
    </button>
  );
};

export default IconButton;
