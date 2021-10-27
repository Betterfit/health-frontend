import React from "react";
import PrettyLink from "./PrettyLink";
import styles from "./TermsOfService.module.css";

const TermsOfService = () => {
  return (
    <div className={styles.root}>
      <p className={styles.title}>
        Terms of Service{" "}
        <PrettyLink
          to="https://betterfit.com/wp-content/uploads/Website_Terms_of_Service_E9283890.pdf"
          text="(View PDF)"
        />
      </p>
    </div>
  );
};

export default TermsOfService;
