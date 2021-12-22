import clsx from "clsx";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import OrderCartToggle from "Components/Order/CartToggle";
import OrderCart from "Components/Order/OrderCart";
import ProductCatalog from "Components/Product/ProductCatalog";
import Globe from "Images/Login/betterfit_globe.svg";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { cartActions } from "Store/cartSlice";
import { useAppDispatch, useAppSelector } from "Store/store";
import styles from "./PublicProductCatalog.module.css";

const PublicProductCatalog = () => {
  const history = useHistory();
  const cartOpen = useAppSelector((state) => state.cart.cartOpen);
  const dispatch = useAppDispatch();

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
      <div className={clsx(styles.right, "flex flex-col md:flex-row-reverse")}>
        <DashboardSideBar
          addonStyles="flex flex-col"
          padding="p-0"
          cartOpen={cartOpen}
        >
          <OrderCartToggle
            cartOpen={cartOpen}
            toggleCart={() => dispatch(cartActions.toggleCartOpen())}
          />
          {cartOpen && <OrderCart />}
        </DashboardSideBar>
        <div className="w-full min-width-0 mx-auto h-screen md:overflow-y-scroll mt-2 relative">
          <ProductCatalog />
        </div>
      </div>
    </div>
  );
};

export default PublicProductCatalog;
