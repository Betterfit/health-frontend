import { TextField } from "@material-ui/core";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import {
  HorizontalDetail,
  VerticalDetail,
} from "Components/InfoDisplay/LabeledDetails";
import { api } from "Helpers/typedAPI";
import { SyntheticEvent } from "hoist-non-react-statics/node_modules/@types/react";
import { productDisplayName } from "Models/products";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Ticket } from "Types";
import styles from "./MarkShippedForm.module.css";

/**
 * Update inventory quickly after marking a ticket as shipped.
 * This should show up right after the MarkShippedForm dialog.
 */
const UpdateInventoryForm = ({
  ticket,
  handleClose,
}: {
  ticket: Ticket;
  handleClose: () => void;
}) => {
  const { warehouse } = ticket;
  const queryClient = useQueryClient();
  const product = ticket.productOption;
  const inventoryParams = {
    productOption: product.id,
    warehouse: warehouse.id,
  };
  const { data: inventory, isLoading: inventoryIsLoading } = useQuery(
    ["inventory", inventoryParams],
    () => api.getInventory(inventoryParams).then((data) => data[0])
  );
  const [newQuantity, setNewQuantity] = useState(0);
  const inventoryMutation = useMutation(
    () => api.updateInventory({ ...inventoryParams, quantity: newQuantity }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["inventory", inventoryParams]);
        handleClose();
      },
    }
  );
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!inventoryMutation.isLoading) inventoryMutation.mutate();
  };

  useEffect(() => {
    if (inventory)
      // subtract the amount of inventory that was just shipped as default
      setNewQuantity(inventory.quantity - ticket.quantity);
  }, [inventory, ticket.quantity]);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Update Inventory</h2>
      <hr />
      <div className={styles.product}>
        <span>{productDisplayName(product)}</span>
        <img src={product.productImage} alt="" style={{ maxWidth: "200px" }} />
        <HorizontalDetail label={product.optionLabel} value={product.name} />
      </div>
      <hr />
      <div className="flex items-center justify-between w-full max-w-xs">
        <VerticalDetail
          label="Old Quantity"
          value={inventory?.quantity}
          // remove margin so that arrow is properly centered between old and new quantity
          className="m-0"
        />
        <span className="text-2xl">→</span>
        <TextField
          label="New Quantity"
          value={newQuantity}
          disabled={inventoryIsLoading}
          onChange={(event) => setNewQuantity(Number(event.target.value))}
          type="number"
          variant="outlined"
          style={{ maxWidth: "130px" }}
        />
      </div>
      <hr />
      <div className={styles.actions}>
        <PrettyButton text="Close" color="red" onClick={handleClose} />
        <PrettyButton
          text="Update"
          color="green"
          type="submit"
          disabled={inventoryMutation.isLoading}
        />
      </div>
    </form>
  );
};
export default UpdateInventoryForm;
