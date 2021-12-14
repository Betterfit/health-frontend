// import Edit from "Images/Icons/edit.svg";
import IconButton from "Components/Content/IconButton";
import Dialog from "Components/Dialog";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { api } from "Helpers/typedAPI";
import React, { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import "react-quill/dist/quill.snow.css";
// import ReactMarkdown from "react-markdown";
// import React from "react";
// import ReactMarkdown from "react-markdown";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ProductImage, ProductOption } from "Types";
import ImageUploadForm from "./ImageUploadForm";

const ProductImages = ({
  product,
  canEdit,
}: {
  product: ProductOption;
  canEdit: boolean;
}) => {
  const [uploadDialog, setUploadDialog] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<ProductImage | null>(null);
  const carouselIndex = useRef(0);
  return (
    <div className="relative ">
      {canEdit && (
        <div className="absolute right-0 z-20">
          <IconButton
            iconName="file_upload"
            label="Upload new images"
            color="green"
            onClick={() => setUploadDialog(true)}
          />
          <IconButton
            iconName="delete"
            label="Delete image"
            color="red"
            onClick={() =>
              setImageToDelete(product.images[carouselIndex.current])
            }
          />
        </div>
      )}
      <Carousel
        showStatus={false}
        onChange={(index) => (carouselIndex.current = index)}
      >
        {product.images.map((image) => (
          <div key={image.id} className="h-full grid place-items-center">
            <img
              src={image.image}
              alt=""
              style={{ objectFit: "contain", maxHeight: "400px" }}
            />
          </div>
        ))}
      </Carousel>
      <Dialog open={uploadDialog} onClose={() => setUploadDialog(false)}>
        <ImageUploadForm
          product={product}
          onSuccess={() => setUploadDialog(false)}
        />
      </Dialog>
      <Dialog
        open={imageToDelete != null}
        onClose={() => setImageToDelete(null)}
      >
        {imageToDelete && (
          <ConfirmDelete
            image={imageToDelete}
            handleClose={() => setImageToDelete(null)}
          />
        )}
      </Dialog>
    </div>
  );
};

const ConfirmDelete = ({
  image,
  handleClose,
}: {
  image: ProductImage;
  handleClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (image: ProductImage) => api.deleteProductImage(image.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("inventory");
        queryClient.invalidateQueries("productOptions");
        handleClose();
      },
    }
  );
  return (
    <div className="dialog">
      <h2>Delete Image</h2>
      <p>Are you sure you want to delete this image?</p>
      <img src={image.image} alt="" style={{ maxWidth: "300px" }} />
      <div className="dialogActions">
        <PrettyButton
          text="Cancel"
          color="green"
          variant="outline"
          onClick={() => handleClose()}
        />
        <PrettyButton
          text="Delete"
          color="red"
          onClick={() => mutation.mutate(image)}
        />
      </div>
    </div>
  );
};

export default ProductImages;
