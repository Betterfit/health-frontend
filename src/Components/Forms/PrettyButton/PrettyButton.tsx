import React from "react";
import styles from "./PrettyButton.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  /**Refers to a material icon
   * https://fonts.google.com/icons
   */
  icon?: string;
}
const PrettyButton = ({ text, icon, ...props }: Props) => {
  return (
    <button className={styles.button} {...props}>
      {icon && <span className="material-icons">{icon}</span>}
      {text}
    </button>
  );
};

export default PrettyButton;
