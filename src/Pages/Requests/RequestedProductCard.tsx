import { productDisplayName } from "APIHooks/products";
import IconButton from "Components/Content/IconButton";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Badge from "Components/Forms/Badge/Badge";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import React, { useState } from "react";
import { Order, OrderProduct, SupplierQuote } from "Types";
import styles from "./RequestedProductCard.module.css";
import { formatCurrency } from "./RequestsPage";

const RequestedProductCard = ({
  order,
  orderProduct,
  selectedQuoteIndex,
  setSelectedQuote,
}: {
  order: Order;
  orderProduct: OrderProduct;
  selectedQuoteIndex: number;
  quotes?: SupplierQuote[];
  setSelectedQuote: (quoteIndex: number) => void;
}) => {
  const [moreSuppliers, setMoreSuppliers] = useState(false);
  const [denied, setDenied] = useState(false);
  const bestMatch = selectedQuoteIndex === 0;
  const resetSupplier = () => setSelectedQuote(0);
  const { supplierQuotes } = orderProduct;
  const selectedQuote = supplierQuotes && supplierQuotes[selectedQuoteIndex];
  const product = orderProduct.productOption;
  const displayName = productDisplayName(product);
  const orderProductMutation = {};

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
      <div className={styles.moreSuppliers}>
        <PrettyButton
          className={styles.showMoreSuppliers}
          text={moreSuppliers ? "Hide other suppliers" : "Show other suppliers"}
          variant="link"
          icon={moreSuppliers ? "expand_less" : "expand_more"}
          onClick={() => setMoreSuppliers(!moreSuppliers)}
        />
        {moreSuppliers &&
          supplierQuotes?.map((quote, i) =>
            i === selectedQuoteIndex ? null : (
              <SupplierCard
                key={i}
                onClick={() => {
                  setSelectedQuote(i);
                  setMoreSuppliers(false);
                }}
                {...{ supplierQuote: quote, orderProduct }}
              >
                <PrettyButton
                  className={styles.chooseThisSupplier}
                  text="Choose This Supplier"
                />
              </SupplierCard>
            )
          )}
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
  if (!supplierQuote)
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
