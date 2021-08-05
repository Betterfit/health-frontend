import React, { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "blue" | "red" | "green";
  iconName: string;
  className?: string;
  label?: string;
  size?: "sm" | "md";
}
const IconButton = ({
  color,
  iconName,
  className,
  label,
  size = "md",
  ...props
}: IconButtonProps) => {
  return (
    <button
      style={{ fontSize: size === "md" ? "32px" : "24px" }}
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
