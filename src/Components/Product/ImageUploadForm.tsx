import clsx from "clsx";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { api } from "Helpers/typedAPI";
import React, { useState } from "react";
import ImageUploader from "react-images-upload";
import { useMutation, useQueryClient } from "react-query";
import { ProductOption } from "Types";
import styles from "./ImageUploadForm.module.css";

const ImageUploadForm = ({
  product,
  onSuccess,
}: {
  product: ProductOption;
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  const [images, setImages] = useState<{ base64: string; file: File }[]>([]);
  const imageMutation = useMutation(
    () =>
      Promise.all(
        images.map((image) =>
          api.uploadProductImage({
            image: image.file,
            product: product.productId,
          })
        )
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("inventory");
        onSuccess();
      },
    }
  );
  return (
    <div className={clsx("dialog", styles.root)} onDrop={(e) => {}}>
      <h2>Add Product Images</h2>
      <ImageUploader
        withIcon={true}
        buttonText="Browse Files"
        withPreview
        onChange={(files, images) => {
          setImages(files.map((file, i) => ({ file, base64: images[i] })));
        }}
        label="New images will be visible on all sizes of this product."
      />
      <div className="dialogActions">
        <PrettyButton text="Save New Images" onClick={imageMutation.mutate} />
      </div>
    </div>
  );
};

export default ImageUploadForm;
