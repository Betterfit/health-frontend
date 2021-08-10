import React from "react";
import styles from "./LoadingSpinner.module.css";

/**
 * @param show Should the spinner be displayed
 * @param darkened Should the background be darkened while the spinner is showing
 * @param errorMessage Text will be displayed instead of a spinner if this is empty
 * Overlaid on the center of the nearest parent element with position:relative
 */
export const LoadingSpinner = ({
  show = true,
  darkened = false,
  errorMessage,
}: {
  show?: boolean;
  darkened?: boolean;
  errorMessage?: string;
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
      {show && (errorMessage ? <p>{errorMessage}</p> : spinner)}
    </div>
  );
};
