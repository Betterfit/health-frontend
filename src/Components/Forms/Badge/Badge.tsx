import React from "react";
import styles from "./Badge.module.css";

const Badge = ({
  text,
  backgroundColor,
  disabled = false,
  icon,
}: {
  text: string;
  backgroundColor: string;
  disabled: boolean;
  icon?: string;
}) => {
  backgroundColor = disabled ? "gray" : backgroundColor;
  return (
    <div className={styles.badge} style={{ backgroundColor }}>
      {icon && <span className="material-icons-outlined">{icon}</span>}
      {text}
    </div>
  );
};

export default Badge;
