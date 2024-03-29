import clsx from "clsx";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { VerticalDetail } from "Components/InfoDisplay/LabeledDetails";
import { formatCurrency, formatTimeStamp } from "Helpers/utils";
import React from "react";
import { useHistory } from "react-router";
import { Facility, Organization, Transfer } from "Types";
import { OrderProductInvoice } from "./PaymentCard";
import styles from "./TransferCard.module.css";

/**
 * Transfers to suppliers are represented as "Received Payments"
 */
const TransferCard = ({ transfer }: { transfer: Transfer }) => {
  const history = useHistory();
  const detailPath = "/dashboard/tickets/" + transfer.ticket.id;
  const onDetailPage = history.location.pathname === detailPath;
  const recipient = transfer.recipient;
  const destination = transfer.ticket.destination;
  return (
    <div className={clsx("cardBorder")} data-testid={"transfer"}>
      <div className="cardHeader">
        <VerticalDetail
          label="Time Received"
          value={formatTimeStamp(transfer.timeCreated)}
        />
        <VerticalDetail
          label="Total (With Taxes)"
          value={formatCurrency(transfer.total)}
        />
        <TransferStatus completed={transfer.completed} />
        {/* don't show the open ticket button if we're already on the detail page */}
        {!onDetailPage && (
          <PrettyButton
            text="Open Ticket"
            onClick={() => history.push(detailPath)}
          />
        )}
      </div>
      <div>
        <OrderProductInvoice orderProduct={transfer.ticket} />
        {onDetailPage && (
          <VerticalDetail
            label="Billing Address"
            value={
              // the organization might not have it's address set so we fall
              // back to the destination facility (but only if it's in the same province).
              hasAddress(recipient) ||
              recipient.province !== destination.province ? (
                <DisplayAddress destination={recipient} />
              ) : (
                // show facilities address, but organization's name
                <DisplayAddress
                  destination={{ ...destination, name: recipient.name }}
                />
              )
            }
          />
        )}
      </div>
    </div>
  );
};

const hasAddress = (object: Organization | Facility) => {
  return (
    object.street != null && object.city != null && object.province != null
  );
};

const DisplayAddress = ({
  destination,
}: {
  destination: Facility | Organization;
}) => {
  return (
    <div className="flex flex-col">
      <span>{destination.name}</span>
      <span>{destination.street}</span>
      <span>
        {destination.postalCode} {destination.city} {destination.province}
      </span>
    </div>
  );
};

const TransferStatus = ({ completed }: { completed: boolean }) => (
  <span
    className={clsx(
      styles.status,
      completed ? styles.statusPaid : styles.statusPending
    )}
    data-testid="transfer status"
  >
    <div />
    {completed ? "Success" : "Pending"}
  </span>
);

export default TransferCard;
