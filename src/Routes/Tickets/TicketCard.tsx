import clsx from "clsx";
import Dialog from "Components/Dialog";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";
import { formatTimeStamp } from "Helpers/utils";
import { productDisplayName } from "Models/products";
import React, { ReactNode, useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { Ticket } from "Types";
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
  ticket: Ticket;
  onDetailPage?: boolean;
}) => {
  const queryClient = useQueryClient();
  const product = ticket.productOption;
  const { destination, purchaser, warehouse } = ticket;
  const history = useHistory();
  // const markShippedPath = `${basePath}/${ticket.id}/mark-shipped`;
  const [dialogState, setDialogState] = useState<DialogState>("closed");
  return (
    <div className={styles.ticket} data-testid={"ticket#" + ticket.id}>
      <TicketDetail extraClass={styles.purchaser} label="Purchaser">
        <p>{purchaser.name}</p> <p>Phone: {destination.phoneNumber}</p>
      </TicketDetail>
      {/* <TicketDetail
        extraClass={styles.sku}
        label="SKU"
        value={product.sku ?? "N/A"}
      /> */}
      <TicketDetail
        extraClass={styles.ticketNumber}
        label="Ticket Id"
        value={ticket.id}
      />
      <TicketDetail extraClass={styles.shippingInfo} label="Shipping Info">
        {!!ticket.trackingNumber ? (
          <>
            <HorizontalDetail label="Carrier" value={ticket.shippingProvider} />
            <HorizontalDetail
              label="Tracking #"
              value={ticket.trackingNumber}
            />
          </>
        ) : (
          <span>N/A</span>
        )}
      </TicketDetail>
      <TicketDetail
        extraClass={styles.date}
        label="Assigned On"
        value={formatTimeStamp(ticket.timeCreated)}
      />
      <TicketDetail extraClass={styles.from} label="Shipping From">
        <span>{warehouse.name}</span>
        <span>{warehouse.street}</span>
        <span>
          {warehouse.postalCode} {warehouse.city} {warehouse.province}
        </span>
      </TicketDetail>
      <TicketDetail extraClass={styles.to} label="Shipping To">
        {/* <span className="text-xs text-slate-50">From:</span> */}
        {/* <span className="text-xs text-slate-50">To:</span> */}
        <span>{destination.name}</span>
        <span>{destination.street}</span>
        <span>
          {destination.postalCode} {destination.city} {destination.province}
        </span>
      </TicketDetail>
      <TicketDetail extraClass={styles.productInfo} label="Product">
        <div className="flex">
          <div className="flex flex-col items-center mr-3">
            <span>{productDisplayName(product)}</span>
            <HorizontalDetail label="SKU" value={product.sku ?? "N/A"} />
            <HorizontalDetail label="Quantity" value={ticket.quantity} />
            <HorizontalDetail
              label={product.optionLabel}
              value={product.name}
            />
          </div>
          <img src={product.productImage} alt={productDisplayName(product)} />
        </div>
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
