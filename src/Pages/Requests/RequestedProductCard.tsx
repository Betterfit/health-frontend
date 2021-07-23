import { productDisplayName } from "APIHooks/products";
import IconButton from "Components/Content/IconButton";
import Badge from "Components/Forms/Badge/Badge";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import React, { useState } from "react";
import { Order, OrderProduct } from "Types";
import styles from "./RequestedProductCard.module.css";
import { formatCurrency } from "./RequestsPage";

const RequestedProductCard = ({
  order,
  orderProduct,
}: {
  order: Order;
  orderProduct: OrderProduct;
}) => {
  const [moreSuppliers, setMoreSuppliers] = useState(false);
  const [supplierIndex, setSupplierIndex] = useState(0);
  const [denied, setDenied] = useState(false);
  const bestMatch = supplierIndex === 0;
  const resetSupplier = () => setSupplierIndex(0);
  const suppliers = [
    { name: "Air Liquide", pricePerUnit: 1.05 },
    { name: "The Canadian Shield", pricePerUnit: 1.05 },
    { name: "The Canadian Shield", pricePerUnit: 1.05 },
  ];
  const supplier = suppliers[supplierIndex];
  const product = orderProduct.productOption;
  const displayName = productDisplayName(product);

  return (
    <div className={styles.orderProduct}>
      <div className={"overlay " + (denied && "overlayVisible")}>
        <PrettyButton
          text="Restore Product"
          icon="restore"
          color="green"
          title="Restore product"
          onClick={() => setDenied(!denied)}
        />
      </div>
      <div className={styles.product}>
        {!denied && (
          <IconButton
            iconName="close"
            color="red"
            title="Deny product"
            className={styles.deleteProduct}
            onClick={() => setDenied(true)}
          />
        )}
        <div className={styles.productImage}>
          <p className={styles.label}>
            {displayName}
            {/* {<IconButton iconName="swap_horiz" aria-label='swap product'/>} */}
          </p>
          <img
            src={product.productImage}
            alt={product.name + " Product Image"}
          />
        </div>
        <div className={styles.productDetails}>
          <div className={styles.labeledContent}>
            <p>quantity</p>
            {orderProduct.quantity}
          </div>
          <div className={styles.labeledContent}>
            <p>{product.optionLabel}</p>
            {product.name}
          </div>
        </div>
      </div>
      <div
        className={styles.supplier}
        onClick={() => setMoreSuppliers(!moreSuppliers)}
      >
        {!denied && (
          <div className={styles.bestMatch}>
            <Badge
              text={bestMatch ? "Best Match Supplier!" : "Custom Supplier"}
              backgroundColor="var(--ocean-blue)"
              icon={bestMatch ? "inventory" : undefined}
              disabled={!bestMatch}
            />
            {!bestMatch && (
              <IconButton
                onClick={resetSupplier}
                iconName="replay"
                title="Restore Best Match Supplier"
                color="red"
              />
            )}
          </div>
        )}
        <div className={styles.supplierImage}>
          <p className={styles.label}>{supplier.name}</p>
          <img src={supplierLogo} alt={supplier.name + " logo"} />
        </div>
        <div className={styles.supplierInfo}>
          <div id={styles.paymentType} className={styles.labeledContent}>
            <p>Payment type</p>
            <p>Immediate</p>
          </div>
          <div className={styles.labeledContent}>
            <p>unit price</p>
            <span>
              <span className={styles.money}>
                {formatCurrency(supplier.pricePerUnit)}
              </span>{" "}
              x {orderProduct.quantity}
            </span>
          </div>
          <div className={styles.labeledContent}>
            <p>total</p>
            <span className={styles.money}>
              {formatCurrency(supplier.pricePerUnit * orderProduct.quantity)}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.moreSuppliers}>
        <PrettyButton
          className={styles.showMoreSuppliers}
          text={moreSuppliers ? "Hide other suppliers" : "Show other suppliers"}
          variant="link"
          icon={moreSuppliers ? "expand_less" : "expand_more"}
          onClick={() => setMoreSuppliers(!moreSuppliers)}
        />
        {moreSuppliers &&
          suppliers
            .filter((_, i) => i !== supplierIndex)
            .map((supplier, i) => (
              <SupplierCard
                key={i}
                selectSupplier={() => {
                  setSupplierIndex(i + 1);
                  setMoreSuppliers(false);
                }}
                {...{ supplier, orderProduct, bestMatch: false }}
              />
            ))}
      </div>
    </div>
  );
};

export default RequestedProductCard;

const supplierLogo =
  "https://www.airliquide.com/sites/airliquide.com/files/styles/938w/public/2018/06/22/air-liquide-publication-cover.jpg?itok=04avR80P";

const SupplierCard = ({
  supplier,
  bestMatch,
  orderProduct,
  selectSupplier,
}: {
  supplier: any;
  bestMatch: boolean;
  orderProduct: OrderProduct;
  selectSupplier: () => void;
}) => {
  return (
    <div onClick={selectSupplier} className={styles.supplier}>
      <div className={styles.bestMatch}></div>
      <div className={styles.supplierImage}>
        <p className={styles.label}>{supplier.name}</p>
        <img src={supplierLogo} alt={supplier.name + " logo"} />
      </div>
      <div className={styles.supplierInfo}>
        <div id={styles.paymentType} className={styles.labeledContent}>
          <p>Payment type</p>
          <p>Immediate</p>
        </div>
        <div className={styles.labeledContent}>
          <p>unit price</p>
          <span>
            <span className={styles.money}>
              {formatCurrency(supplier.pricePerUnit)}
            </span>{" "}
            x {orderProduct.quantity}
          </span>
        </div>
        <div className={styles.labeledContent}>
          <p>total</p>
          <span className={styles.money}>
            {formatCurrency(supplier.pricePerUnit * orderProduct.quantity)}
          </span>
        </div>
      </div>
      <PrettyButton
        className={styles.chooseThisSupplier}
        text="Choose This Supplier"
      />
    </div>
  );
};
