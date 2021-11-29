import React from "react";
import PrettyLink from "./PrettyLink";

const TermsOfService = () => {
  return (
    <div className="text-center">
      <PrettyLink
        to="https://betterfit.com/wp-content/uploads/Website_Terms_of_Service_E9283890.pdf"
        text="View Terms of Service (PDF)"
      />
    </div>
  );
};

export default TermsOfService;
