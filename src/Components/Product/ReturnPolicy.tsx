import React from "react";
import { Organization } from "Types";
import styles from "./ReturnPolicy.module.css";

const ReturnPolicy = ({ supplier }: { supplier: Organization }) =>
  supplier.offerReturns ? (
    <a
      href={supplier.returnPolicyLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.returnPolicy}
    >
      Return Policy
    </a>
  ) : (
    <p className={styles.returnPolicy}>No Returns</p>
  );

export default ReturnPolicy;
