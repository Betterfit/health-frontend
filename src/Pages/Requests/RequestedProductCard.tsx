import { productDisplayName } from "APIHooks/products";
import IconButton from "Components/Content/IconButton";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Badge from "Components/Forms/Badge/Badge";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import React, { useState } from "react";
import { Order, OrderProduct, ProductPricing, SupplierQuote } from "Types";
import styles from "./RequestedProductCard.module.css";
import { formatCurrency } from "./RequestsPage";

const RequestedProductCard = ({
  order,
  orderProduct,
  selectedQuote,
  pricing,
  selectQuote,
}: {
  order: Order;
  orderProduct: OrderProduct;
  selectedQuote?: SupplierQuote | null;
  pricing?: ProductPricing;
  selectQuote: (quote: SupplierQuote) => void;
}) => {
  const [moreSuppliers, setMoreSuppliers] = useState(false);
  const [denied, setDenied] = useState(false);
  const bestMatch =
    selectedQuote &&
    selectedQuote.supplier.id === pricing?.purchaseOptions[0].supplier.id;
  const otherSuppliers =
    pricing && selectedQuote
      ? pricing.purchaseOptions.filter(
          (quote) => quote.supplier.id !== selectedQuote.supplier.id
        )
      : [];
  const resetSupplier = () => {
    if (pricing && pricing.purchaseOptions.length > 0)
      selectQuote(pricing.purchaseOptions[0]);
  };
  const product = orderProduct.productOption;
  const displayName = productDisplayName(product);

  const selectedSupplierComponent =
    selectedQuote === null ? (
      <div className={styles.supplier}>No suppliers for this product</div>
    ) : (
      <SupplierCard
        onClick={() => setMoreSuppliers(!moreSuppliers)}
        {...{ selectedQuote, orderProduct }}
        supplierQuote={selectedQuote}
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
      </SupplierCard>
    );

  return (
    <div className={styles.orderProduct}>
      <div
        className={"overlay " + (denied && "overlayVisible darkenedBackground")}
      >
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
      {selectedSupplierComponent}
      <div className={styles.moreSuppliers}>
        <PrettyButton
          className={styles.showMoreSuppliers}
          text={moreSuppliers ? "Hide other suppliers" : "Show other suppliers"}
          variant="link"
          icon={moreSuppliers ? "expand_less" : "expand_more"}
          disabled={selectedQuote == null}
          onClick={() => setMoreSuppliers(!moreSuppliers)}
        />
        {moreSuppliers &&
          otherSuppliers.map((quote, i) => (
            <SupplierCard
              key={i}
              onClick={() => {
                selectQuote(quote);
                setMoreSuppliers(false);
              }}
              {...{ supplierQuote: quote, orderProduct }}
            >
              <PrettyButton
                className={styles.chooseThisSupplier}
                text="Choose This Supplier"
              />
            </SupplierCard>
          ))}
      </div>
    </div>
  );
};

export default RequestedProductCard;

const SupplierCard = ({
  supplierQuote,
  orderProduct,
  children,
  onClick,
}: {
  supplierQuote?: SupplierQuote;
  orderProduct: OrderProduct;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  if (supplierQuote === undefined)
    return (
      <div className={styles.supplier}>
        <LoadingSpinner show />
      </div>
    );

  const supplier = supplierQuote.supplier;
  return (
    <div onClick={onClick} className={styles.supplier}>
      <div className={styles.bestMatch}></div>
      <div className={styles.supplierImage}>
        <p className={styles.label}>{supplier.name}</p>
        <img
          src={supplier.organizationImage}
          alt={supplier.organizationImage ? supplier.name + " logo" : ""}
        />
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
              {formatCurrency(supplierQuote.priceInfo.pricePer)}
            </span>{" "}
            x {orderProduct.quantity}
          </span>
        </div>
        <div className={styles.labeledContent}>
          <p>total</p>
          <span className={styles.money}>
            {formatCurrency(
              supplierQuote.priceInfo.pricePer * orderProduct.quantity
            )}
          </span>
        </div>
      </div>
      {children}
    </div>
  );
};
