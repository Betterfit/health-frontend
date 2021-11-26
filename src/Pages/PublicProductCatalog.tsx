import clsx from "clsx";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import ProductCatalog from "Components/Product/ProductCatalog";
import Globe from "Images/Login/betterfit_globe.svg";
import React from "react";
import styles from "./PublicProductCatalog.module.css";

const PublicProductCatalog = () => {
  return (
    <div className={styles.root}>
      <div className={clsx(styles.left)}>
        <img src={Globe} className={clsx(styles.globe)} alt="" />
        <div className={styles.ctaBox}>
          <p>Browse our product catalog.</p>
          <p>Sign up to purchase.</p>
          <PrettyButton
            text="Sign Up"
            onClick={() =>
              (window.location.href = "https://betterfit.com/apply-now/")
            }
          />
        </div>
        <a href="/login" className={clsx(styles.login)}>
          Login to existing account.
        </a>
      </div>
      <div className={styles.right}>
        <ProductCatalog />
      </div>
    </div>
  );
};

export default PublicProductCatalog;
