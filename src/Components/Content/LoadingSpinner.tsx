import React from "react";
import styles from "./LoadingSpinner.module.css";

/**
 * @param show Should the spinner be displayed
 * @param darkened Should the background be darkened while the spinner is showing
 * Overlaid on the center of the nearest parent element with position:relative
 */
export const LoadingSpinner = ({
  show = true,
  darkened = false,
}: {
  show?: boolean;
  darkened?: boolean;
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

  let className = "overlay";
  if (show) className += " overlayVisible";
  if (show && darkened) className += " darkenedBackground";
  return (
    <div className={className}>
      {/* conditionally rendered for better performance */}
      {show && spinner}
    </div>
  );
};
