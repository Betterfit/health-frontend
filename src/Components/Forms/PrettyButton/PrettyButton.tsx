import React from "react";
import styles from "./PrettyButton.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: "blue" | "red";
  /**Refers to a material icon
   * https://fonts.google.com/icons
   */
  icon?: string;
  //   variant?: "solid" | "outlined";
}
const PrettyButton = ({ text, icon, color = "blue", ...props }: Props) => {
  return (
    <button className={`${styles.button} ${colorClass[color]}`} {...props}>
      {icon && <span className="material-icons-outlined">{icon}</span>}
      {text}
    </button>
  );
};

const colorClass = { blue: styles.blue, red: styles.red };

export default PrettyButton;
