import clsx from "clsx";
import React, { ReactNode } from "react";
import styles from "./LabeledDetails.module.css";

export const VerticalDetail = ({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) => {
  return (
    <div className={styles.verticalDetail}>
      <span className={styles.verticalDetailLabel}>{label}</span>
      <span className={styles.verticalDetailValue}>{value}</span>
    </div>
  );
};

export const HorizontalDetail = ({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: ReactNode;
  fullWidth?: boolean;
}) => {
  return (
    <div
      className={clsx(styles.horizontalDetail, fullWidth && styles.fullWidth)}
    >
      <span className={styles.horizontalDetailLabel}>{label}</span>
      <span className={styles.horizontalDetailValue}>{value}</span>
    </div>
  );
};
