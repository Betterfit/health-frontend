import Spinner from "Images/spinner.gif";
import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="relative w-full min-h-screen">
      <img
        className="absolute left-0 right-0 spinner"
        style={{ maxWidth: 150 }}
        src={Spinner}
        alt="loading"
      />
    </div>
  );
};
