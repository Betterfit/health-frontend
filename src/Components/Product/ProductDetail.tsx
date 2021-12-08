import Dialog from "Components/Dialog";
import EditProductForm from "Components/Forms/EditProductForm";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { VerticalDetail } from "Components/InfoDisplay/LabeledDetails";
import React, { useState } from "react";
// import ReactMarkdown from "react-markdown";
import { ReactNode } from "react-transition-group/node_modules/@types/react";
import { Inventory, ProductOption } from "Types";
import AddProductForm from "./AddProductForm";
import styles from "./ProductDetail.module.css";
import ShippingInfoForm from "./ShippingInfoForm";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation, useQueryClient } from "react-query";
import { api } from "Helpers/typedAPI";

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
  console.log("product, productDetail => ", product);

  const [dialogOpen, setDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const productMutation = useMutation(
    (description: string) =>
      api.updateProduct(product.productId, { description: description }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("inventory");
        setDialogOpen(false);
      },
    }
  );

  return (
    <div className="flex flex-col sm:grid sm:grid-cols-2 w-full">
      <img src={product.productImage} alt="" className="w-full max-w-sm" />
      {/* <div style={{ zIndex: 5 }}>
        <ReactImageMagnify
          smallImage={{
            src: product.productImage,
            isFluidWidth: true,
          }}
          largeImage={{ src: product.productImage, width: 900, height: 900 }}
        /> */}
      {/* </div> */}
      {inventory ? (
        <EditProductForm inventory={inventory} />
      ) : (
        <AddProductForm product={product} />
      )}
      {inventory && (
        <div className="bg-betterfit-soft-blue col-span-2 py-4 my-4">
          <h3 className="text-center mediumTitle">Shipping Information</h3>
          <hr className="my-2" />
          <ShippingInfoForm product={product} />
        </div>
      )}
      <div>
        <h3 className="text-center mediumTitle">Product Details</h3>
        <hr className="my-2" />
        {/* <ReactMarkdown
          className={styles.description}
          children={product.productDescription}
          // links will open in new tab
          linkTarget="_blank"
        /> */}
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: product.productDescription }}
        ></div>
        <PrettyButton
          text={
            product.productDescription === ""
              ? "Add Description"
              : "Edit Description"
          }
          onClick={() => setDialogOpen(true)}
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
        <DescriptionEditor
          dialogOpen={dialogOpen}
          description={product.productDescription}
          loading={productMutation.isLoading}
          close={() => setDialogOpen(false)}
          save={(description: string) => productMutation.mutate(description)}
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

const DescriptionEditor = ({
  dialogOpen,
  description,
  loading,
  close,
  save,
}: {
  dialogOpen: boolean;
  description: string;
  loading: boolean;
  close: () => void;
  save: (descripiton: string) => void;
}) => {
  const [productDescription, setProductDescription] = useState<string>(
    description
  );
  return (
    <Dialog open={dialogOpen} disableBackdropClick>
      <div className="p-5">
        <ReactQuill
          value={productDescription}
          onChange={(value) => setProductDescription(value)}
        />
        <PrettyButton
          className="mt-5 mr-auto ml-auto"
          text="Save"
          onClick={() => save(productDescription)}
          disabled={loading}
        />
        <PrettyButton
          className="mt-5 mr-auto ml-auto"
          text="Close"
          onClick={close}
          variant="outline"
        />
      </div>
    </Dialog>
  );
};

export default ProductDetail;
