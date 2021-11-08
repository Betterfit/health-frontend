import clsx from "clsx";
import Dialog from "Components/Dialog";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";
import { formatTimeStamp } from "Helpers/utils";
import { productDisplayName } from "Models/products";
import React, { ReactNode, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { SupplierTicket } from "Types";
import MarkShippedForm from "./MarkShippedForm";
import PrintTickets from "./PrintTickets";
import styles from "./TicketCard.module.css";
import UpdateInventoryForm from "./UpdateInventoryForm";

const basePath = "/dashboard/tickets";
type DialogState = "closed" | "markShipped" | "updateInventory";

/**
 * Displays the ticket's information and allows the user to mark it as shipped.
 */
const TicketCard = ({
  ticket,
  onDetailPage = false,
}: {
  ticket: SupplierTicket;
  onDetailPage?: boolean;
}) => {
  const queryClient = useQueryClient();
  const product = ticket.orderProduct.productOption;
  const { destination, purchaser, orderProduct } = ticket;
  const history = useHistory();
  // const markShippedPath = `${basePath}/${ticket.id}/mark-shipped`;
  const [dialogState, setDialogState] = useState<DialogState>("closed");
  return (
    <div className={styles.ticket}>
      <TicketDetail label="Purchaser">
        <p>{purchaser.name}</p> <p>Phone: {destination.phoneNumber}</p>
      </TicketDetail>
      <TicketDetail label="SKU" value={product.sku ?? "N/A"} />
      <TicketDetail label="Ticket Id" value={ticket.id} />
      <TicketDetail
        label="Assigned On"
        value={formatTimeStamp(ticket.timeCreated)}
      />
      <TicketDetail label="Shipping Address">
        <span>{destination.name}</span>
        <span>{destination.street}</span>
        <span>
          {destination.postalCode} {destination.city} {destination.province}
        </span>
      </TicketDetail>
      <TicketDetail label="Product">
        <div className="flex flex-col items-center">
          <span>{productDisplayName(product)}</span>
          <img src={product.productImage} alt={productDisplayName(product)} />
        </div>
        <HorizontalDetail label="Quantity" value={orderProduct.quantity} />
        <HorizontalDetail label={product.optionLabel} value={product.name} />
      </TicketDetail>
      {/* <TicketDetail label={product.optionLabel} value={product.name} />
      <TicketDetail label="Quantity" value={orderProduct.quantity} /> */}
      {/* <TicketDetail label="Status" value={ticket.status} />
      <TicketDetail label="Shipping Info" value={ticket.shippingProvider} /> */}
      <div className={styles.actions}>
        {ticket.status === "open" && (
          <PrettyButton
            text="Mark Shipped"
            color="green"
            // onClick={() => history.push(markShippedPath)}
            onClick={() => setDialogState("markShipped")}
          />
        )}
        {!onDetailPage && (
          <PrettyButton
            text="View Details"
            color="blue"
            onClick={() => history.push(basePath + "/" + ticket.id)}
          />
        )}
        {onDetailPage && (
          <PrintTickets tickets={[ticket]} label="Print Ticket" />
        )}
      </div>
      <Dialog
        open={
          dialogState !== "closed"
          // ticket.status !== "shipped" &&
          // history.location.pathname === markShippedPath
        }
        onClose={() => setDialogState("markShipped")}
      >
        {dialogState === "markShipped" ? (
          <MarkShippedForm
            ticket={ticket}
            onSuccess={() => setDialogState("updateInventory")}
            onCancel={() => setDialogState("closed")}
          />
        ) : (
          <UpdateInventoryForm
            ticket={ticket}
            handleClose={() => {
              queryClient.invalidateQueries("tickets");
              setDialogState("closed");
            }}
          />
        )}
      </Dialog>
    </div>
  );
};

const TicketDetail = ({
  label,
  value,
  children,
  extraClass,
}: {
  label: string;
  value?: string | number;
  children?: ReactNode;
  extraClass?: string;
}) => {
  return (
    <div className={clsx(styles.ticketDetail, extraClass)}>
      <span>{label}</span>
      {value ? <span>{value}</span> : children}
    </div>
  );
};

export default TicketCard;
