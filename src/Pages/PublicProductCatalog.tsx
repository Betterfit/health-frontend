import clsx from "clsx";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import ProductCatalog from "Components/Product/ProductCatalog";
import Globe from "Images/Login/betterfit_globe.svg";
import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./PublicProductCatalog.module.css";

const PublicProductCatalog = () => {
  const history = useHistory();
  return (
    <div className={styles.root}>
      <div className={clsx(styles.left)}>
        <img src={Globe} className={clsx(styles.globe)} alt="" />
        <div className={styles.loginBox}>
          <p>Browse our product catalog.</p>
          <p>Login to purchase.</p>
          <PrettyButton
            text="Login"
            className="mt-4"
            onClick={() => history.push("/login")}
          />
          <p className="mt-8">Don't have a Supply Net account?</p>
          <PrettyButton
            text="Apply Today"
            variant="outline"
            color="transparent"
            onClick={() =>
              (window.location.href = "https://betterfit.com/apply-now/")
            }
          />
        </div>
      </div>
      <div className={styles.right}>
        <ProductCatalog />
      </div>
    </div>
  );
};

export default PublicProductCatalog;
