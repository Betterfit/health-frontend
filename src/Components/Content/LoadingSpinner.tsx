import React from "react";
import styles from "./LoadingSpinner.module.css";

export const LoadingSpinner = () => {
  return (
    <div>
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
