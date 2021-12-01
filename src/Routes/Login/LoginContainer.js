import clsx from "clsx";
import Globe from "Images/Login/betterfit_globe.svg";
import React from "react";
import styles from "./LoginContainer.module.css";

const LoginContainer = ({ children }) => {
  return (
    <div className={clsx(styles.root)}>
      <img src={Globe} className={styles.globe} alt="" />
      <div className={clsx(styles.form)}>{children}</div>
    </div>
  );
};

export default LoginContainer;
