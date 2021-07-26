import React from "react";
import styles from "./LoadingSpinner.module.css";

/**
 * @param show Should the spinner be displayed
 * @param withOverlay Put a partially opaque overlay behind the spinner
 * Overlay is over nearest parent element with position:relative
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

  let className = "";
  if (withOverlay) {
    className = "overlay";
    if (show) className += " overlayVisible";
  }
  return <div className={className}>{show && spinner}</div>;
};
