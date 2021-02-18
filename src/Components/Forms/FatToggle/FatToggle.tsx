import React from "react";
import styles from "./FatToggle.module.css";

interface FatToggleProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}
/**
 * Thick square toggle.
 * Not bullying, it's just the truth.
 */
export const FatToggle = ({ label, checked, onToggle }: FatToggleProps) => {
  return (
    <div className="flex items-center">
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle()}
        />
        <span role="checkbox" className={styles.slider} tabIndex={0} />
      </label>
      <label htmlFor="fatToggle" className="ml-3 text-flow-white">
        {label}
      </label>
    </div>
  );
};
