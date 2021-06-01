import React from "react";
import styles from "./AccountManagement.module.css";

const AccountManagement = () => {
  return (
    <div className={styles.root}>
      <div className={styles.facilities}>My Facilities</div>
      <div className={styles.addAccounts}>Accounts</div>
      <div className={styles.users}>Users</div>
    </div>
  );
};

export default AccountManagement;
