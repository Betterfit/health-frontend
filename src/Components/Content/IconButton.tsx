import React, { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "blue" | "red" | "green";
  iconName: string;
  className?: string;
}
const IconButton = ({
  color,
  iconName,
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      aria-label={iconName}
      className={`material-icons-outlined md-18 ${styles.button} ${
        color && !props.disabled && styles[color]
      } ${className && className}`}
      {...props}
    >
      {iconName}
    </button>
  );
};

export default IconButton;
