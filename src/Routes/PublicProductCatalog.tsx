import clsx from "clsx";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import OrderCart from "Components/Order/OrderCart";
import ProductCatalog from "Components/Product/ProductCatalog";
import Globe from "Images/Login/betterfit_globe.svg";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./PublicProductCatalog.module.css";

const PublicProductCatalog = () => {
  const history = useHistory();

  return (
    <div className={styles.root}>
      <div className={clsx(styles.left)}>
        <img src={Globe} className={clsx(styles.globe)} alt="" />
        <div className={styles.ctaBox}>
          <p>Browse our product catalog.</p>
          <p>Sign up to purchase.</p>
          <PrettyButton
            text="Sign Up"
            onClick={() => history.push("/signup")}
          />
        </div>
        <Link to="/login" className={clsx(styles.login)}>
          Login to existing account.
        </Link>
      </div>
      <div className={styles.right}>
        <ProductCatalog />
        <div className="flex flex-col">
          <OrderCart />
        </div>
      </div>
    </div>
  );
};

export default PublicProductCatalog;
