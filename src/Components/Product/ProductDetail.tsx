import EditProductForm from "Components/Forms/EditProductForm";
import { VerticalDetail } from "Components/InfoDisplay/LabeledDetails";
import React from "react";
import ReactMarkdown from "react-markdown";
import { ReactNode } from "react-transition-group/node_modules/@types/react";
import { Inventory, ProductOption } from "Types";
import AddProductForm from "./AddProductForm";
import styles from "./ProductDetail.module.css";

/**
 * Detailed product information/forms that are displayed on the New Order and
 * Inventory pages.
 */
const ProductDetail = ({
  product,
  inventory,
  children,
}: {
  product: ProductOption;
  /** Displays inventory information if provided */
  inventory?: Inventory;
  children?: ReactNode;
}) => {
  return (
    <div className="grid grid-cols-2 w-full">
      <img src={product.productImage} alt="" className="w-full max-w-sm" />
      {inventory ? (
        <EditProductForm inventory={inventory} />
      ) : (
        <AddProductForm product={product} />
      )}
      <div>
        <h3 className="text-center mediumTitle">Product Details</h3>
        <hr className="my-2" />
        <ReactMarkdown
          className={styles.description}
          children={product.productDescription}
          // links will open in new tab
          linkTarget="_blank"
        />
        <VerticalDetail
          leftAlign
          label={product.optionLabel}
          value={product.name}
        />
        <VerticalDetail
          leftAlign
          label="Category"
          value={product.productCategory}
        />
      </div>
      {inventory && (
        <div>
          <h3 className="text-center mediumTitle">Current Inventory</h3>
          <hr className="my-2" />
          <VerticalDetail
            leftAlign
            label="Total Stock"
            value={inventory.quantity}
          />
          <VerticalDetail
            leftAlign
            label="Committed to Open Orders"
            value={inventory.allottedQuantity}
          />
          <VerticalDetail
            leftAlign
            label="Available to Sell"
            value={inventory.quantity - inventory.allottedQuantity}
          />
        </div>
      )}
      {children}
    </div>
  );
};
export default ProductDetail;
