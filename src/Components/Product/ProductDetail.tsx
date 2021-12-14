// import Edit from "Images/Icons/edit.svg";
import IconButton from "Components/Content/IconButton";
import Dialog from "Components/Dialog";
import EditProductForm from "Components/Forms/EditProductForm";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { VerticalDetail } from "Components/InfoDisplay/LabeledDetails";
import { api } from "Helpers/typedAPI";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import ReactMarkdown from "react-markdown";
// import React from "react";
// import ReactMarkdown from "react-markdown";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ReactNode } from "react-transition-group/node_modules/@types/react";
import { Inventory, ProductOption } from "Types";
import AddProductForm from "./AddProductForm";
import ImageUploadForm from "./ImageUploadForm";
import styles from "./ProductDetail.module.css";
import ShippingInfoForm from "./ShippingInfoForm";

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
    <div className="flex flex-col sm:grid sm:grid-cols-2 w-full pt-4">
      <ProductImages product={product} canEdit={inventory != null} />
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
        {product.productDescription === "" && (
          <PrettyButton
            text="Add Description"
            onClick={() => setDialogOpen(true)}
          />
        )}
        <div className={styles.descriptionWrapper}>
          {product.productDescription !== "" && (
            <IconButton
              className="float-right text-gray-600"
              iconName="edit"
              onClick={() => setDialogOpen(true)}
            />
          )}
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: product.productDescription }}
          ></div>
        </div>
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

  /* 
    Using this check because the quill editer returns <p><br></p> when the input is empty.
  */
  const isEmpty = () => {
    return productDescription.replace(/<(.|\n)*?>/g, "").trim().length === 0
      ? true
      : false;
  };

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
          onClick={() => save(isEmpty() ? "" : productDescription)}
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

const ProductImages = ({
  product,
  canEdit,
}: {
  product: ProductOption;
  canEdit: boolean;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="relative ">
      {canEdit && (
        <IconButton
          className="absolute right-0 z-20"
          iconName="file_upload"
          label="Upload images"
          color="green"
          onClick={() => setDialogOpen(true)}
        />
      )}
      <Carousel showStatus={false}>
        {product.images.map((image) => (
          <div key={image.id} className="h-full">
            <img
              src={image.image}
              alt=""
              style={{ objectFit: "contain", maxHeight: "350px" }}
            />
          </div>
        ))}
      </Carousel>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <ImageUploadForm product={product} />
      </Dialog>
    </div>
  );
};

export default ProductDetail;
