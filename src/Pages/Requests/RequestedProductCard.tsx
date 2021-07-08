import IconButton from "Components/Content/IconButton";
import Badge from "Components/Forms/Badge/Badge";
import React, { useState } from "react";
import styles from "./RequestedProductCard.module.css";
import { formatCurrency, Order, OrderProduct } from "./RequestsPage";

const RequestedProductCard = ({
  product,
  order,
}: {
  order: Order;
  product: OrderProduct;
}) => {
  const [supplierIndex, setSupplierIndex] = useState(1);
  const bestMatch = supplierIndex === 0;
  const resetSupplier = () => setSupplierIndex(0);
  const supplier = product.suppliers[supplierIndex];
  return (
    <div className={styles.orderProduct}>
      <div className={styles.product}>
        <IconButton
          iconName="close"
          color="red"
          className={styles.deleteProduct}
        />
        <div className={styles.productImage}>
          <p className={styles.label}>
            {product.name}
            {<IconButton iconName="swap_horiz" />}
          </p>
          <img src={product.imageUrl} alt={product.name + " Product Image"} />
        </div>
        <div className={styles.productDetails}>
          <div className={styles.labeledContent}>
            <p>quantity</p>
            {product.quantity}
          </div>
          <div className={styles.labeledContent}>
            <p>size</p>
            {product.size}
          </div>
        </div>
      </div>
      <div className={styles.supplier}>
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
              x {product.quantity}
            </span>
          </div>
          <div className={styles.labeledContent}>
            <p>total</p>
            <span className={styles.money}>
              {formatCurrency(supplier.pricePerUnit * product.quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestedProductCard;

const supplierLogo =
  "https://www.airliquide.com/sites/airliquide.com/files/styles/938w/public/2018/06/22/air-liquide-publication-cover.jpg?itok=04avR80P";
