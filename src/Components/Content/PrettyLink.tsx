import React from "react";
import styles from "./PrettyLink.module.css";

const PrettyLink = ({ to, text }: { to: string; text: string }) => {
  return (
    <a
      className={styles.link}
      href={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );
};

export default PrettyLink;
