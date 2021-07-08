import React, { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "blue" | "red" | "green";
  iconName: string;
  className?: string;
  label?: string;
}
const IconButton = ({
  color,
  iconName,
  className,
  label,
  ...props
}: IconButtonProps) => {
  return (
    <button
      aria-label={label ? label : iconName}
      title={label}
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
