import clsx from "clsx";
import React, { ReactNode } from "react";
import styles from "./LabeledDetails.module.css";

export const VerticalDetail = ({
  label,
  value,
  labelClass,
  valueClass,
  className,
  leftAlign = false,
}: {
  label: string;
  value: ReactNode;
  labelClass?: string;
  valueClass?: string;
  className?: string;
  leftAlign?: boolean;
}) => {
  return (
    <div
      className={clsx(
        styles.verticalDetail,
        className,
        leftAlign ? "items-start" : "items-center text-center"
      )}
    >
      <span className={clsx(styles.verticalDetailLabel, labelClass)}>
        {label}
      </span>
      <span className={clsx(styles.verticalDetailValue, valueClass)}>
        {value}
      </span>
    </div>
  );
};

export const HorizontalDetail = ({
  label,
  labelClass,
  value,
  fullWidth = false,
}: {
  label: ReactNode;
  labelClass?: string;
  value: ReactNode;
  fullWidth?: boolean;
}) => {
  return (
    <div
      className={clsx(styles.horizontalDetail, fullWidth && styles.fullWidth)}
    >
      <span className={clsx(styles.horizontalDetailLabel, labelClass)}>
        {label}
      </span>
      <span className={styles.horizontalDetailValue}>{value}</span>
    </div>
  );
};
