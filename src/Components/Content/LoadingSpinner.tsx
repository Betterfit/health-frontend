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
  bubbleColor = "white",
}: {
  show?: boolean;
  darkened?: boolean;
  errorMessage?: string;
  bubbleColor?: string;
}) => {
  const spinner = (
    <>
      <div className={styles["lds-ellipsis"]}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ backgroundColor: bubbleColor }} />
        ))}
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
