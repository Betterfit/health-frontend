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
  variant?: keyof typeof variantClasses;
  className?: string;
}
const PrettyButton = ({
  text,
  icon,
  color = "blue",
  onClick,
  variant = "solid",
  className,
  ...props
}: Props) => {
  const colorClass =
    props.disabled || variant === "link" ? "" : colorClasses[color];
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      e.preventDefault();
      // stops parent nodes from recieving a click event
      e.stopPropagation();
      onClick();
    }
    if (variant !== "link") createRipple(e);
  };
  return (
    <button
      className={`${styles.button} ${colorClass} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      // required because the icon can mess up the accessible name
      aria-label={text}
      {...props}
    >
      {text}
      {icon && (
        <span className={`material-icons-outlined ${styles.icon}`}>{icon}</span>
      )}
    </button>
  );
};

const colorClasses = {
  gray: "",
  blue: styles.blue,
  red: styles.red,
  green: styles.green,
  transparent: styles.transparent,
};
const variantClasses = {
  link: styles.link,
  solid: styles.solid,
  outline: styles.outline,
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
