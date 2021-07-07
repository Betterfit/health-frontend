import React from "react";
import styles from "./PrettyButton.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  color?: keyof typeof colorClasses;
  /**Refers to a material icon
   * https://fonts.google.com/icons
   */
  icon?: string;
  onClick?: () => void;
  //   variant?: "solid" | "outlined";
}
const PrettyButton = ({
  text,
  icon,
  color = "blue",
  onClick,
  ...props
}: Props) => {
  const colorClass = props.disabled ? "" : colorClasses[color];
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick();
    createRipple(e);
  };
  return (
    <button
      className={`${styles.button} ${colorClass}`}
      onClick={handleClick}
      {...props}
    >
      {icon && <span className="material-icons-outlined">{icon}</span>}
      {text}
    </button>
  );
};

const colorClasses = {
  blue: styles.blue,
  red: styles.red,
  green: styles.green,
};

export default PrettyButton;

const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
  const button = event.currentTarget;

  const circle = document.createElement("div");
  // circle.innerHTML = "hello there";
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  const rect = button.getBoundingClientRect();

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.x - radius}px`;
  circle.style.top = `${event.clientY - rect.y - radius}px`;
  circle.classList.add(styles.ripple);

  const ripple = button.getElementsByClassName(styles.ripple)[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
};
