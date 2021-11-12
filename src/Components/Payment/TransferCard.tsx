import clsx from "clsx";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { VerticalDetail } from "Components/InfoDisplay/LabeledDetails";
import { formatTimeStamp } from "Helpers/utils";
import { formatCurrency } from "Pages/Requests/RequestsPage";
import React from "react";
import { useHistory } from "react-router";
import { Transfer } from "Types";
import { OrderProductInvoice } from "./PaymentCard";
import styles from "./TransferCard.module.css";

/**
 * Transfers two suppliers are represented as "Received Payments"
 */
const TransferCard = ({ transfer }: { transfer: Transfer }) => {
  const history = useHistory();
  const detailPath = "/dashboard/tickets/" + transfer.ticket.id;
  const onDetailPage = history.location.pathname === detailPath;
  const recipient = transfer.recipient;
  return (
    <div className={clsx("cardBorder")}>
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
              <>
                <span>{recipient.name}</span>
                <span>{recipient.street}</span>
                <span>
                  {recipient.postalCode} {recipient.city} {recipient.province}
                </span>
              </>
            }
          />
        )}
      </div>
    </div>
  );
};

const TransferStatus = ({ completed }: { completed: boolean }) => (
  <span
    className={clsx(
      styles.status,
      completed ? styles.statusPaid : styles.statusPending
    )}
  >
    <div />
    {completed ? "Success" : "Pending"}
  </span>
);

export default TransferCard;
