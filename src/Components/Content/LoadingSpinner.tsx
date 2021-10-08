import React from "react";
import styles from "./LoadingSpinner.module.css";

/**
 * @param show Should the spinner be displayed (true by default)
 * @param errorMessage Text will be displayed instead of a spinner if this is not empty
 * @param genericError Show a generic error message
 * @param darkened Should the background be darkened while the spinner is showing
 * @param bubbleColor The color of the bubbles on the loading spinners
 *
 * Overlaid on the center of the nearest parent element with position:relative
 */
export const LoadingSpinner = ({
  show = true,
  darkened = false,
  errorMessage,
  genericError = false,
  bubbleColor = "white",
}: {
  show?: boolean;
  darkened?: boolean;
  errorMessage?: string;
  genericError?: boolean;
  bubbleColor?: string;
}) => {
  let className = "overlay";
  /* conditionally rendered for better performance */
  if (!show) return <div className={className} />;

  className += " overlayVisible";
  if (darkened) className += " darkenedBackground";
  const showError = errorMessage || genericError;
  return (
    <div className={className}>
      {showError ? (
        <p>{genericError ? "Something went wrong" : errorMessage}</p>
      ) : (
        <Spinner {...{ bubbleColor }} />
      )}
    </div>
  );
};

const Spinner = ({ bubbleColor }: { bubbleColor: string }) => (
  <>
    <div className={styles["lds-ellipsis"]}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ backgroundColor: bubbleColor }} />
      ))}
    </div>
    <span className="sr-only">Loading...</span>
  </>
);
