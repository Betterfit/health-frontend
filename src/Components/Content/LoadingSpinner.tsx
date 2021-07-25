import React from "react";
import styles from "./LoadingSpinner.module.css";

/**
 * @param show Should the spinner be displayed
 * @param withOverlay Put a partially opaque overlay behind the spinner
 */
export const LoadingSpinner = ({
  show = true,
  withOverlay = false,
}: {
  show?: boolean;
  withOverlay?: boolean;
}) => {
  const spinner = (
    <>
      <div className={styles["lds-ellipsis"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span className="sr-only">Loading...</span>
    </>
  );
  if (!withOverlay && !show) return null;

  return (
    <div
      className={withOverlay && show ? styles.overlayVisible : styles.overlay}
    >
      {show && spinner}
    </div>
  );
};
