import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import QRCode from "qrcode.react";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Ticket } from "Types";
import styles from "./PrintTickets.module.css";

/**
 * Button that will print out the supplied tickets when pressed.
 */
const PrintTickets = ({
  tickets,
  label,
}: {
  tickets: Ticket[];
  label: string;
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <PrettyButton text={label} onClick={handlePrint} />
      <div style={{ display: "none" }}>
        <div className={styles.ticketGrid} ref={componentRef}>
          {tickets.map((ticket) => (
            <TicketPrintout key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </>
  );
};

const TicketPrintout = ({ ticket }: { ticket: Ticket }) => {
  const warehouse = ticket.warehouse;
  const destination = ticket.destination;
  const product = ticket.productOption;
  return (
    <div className={styles.ticket}>
      <span>
        Betterfit Supplynet - Ticket <strong>#{ticket.id}</strong> - Order{" "}
        <strong>#{ticket.order}</strong>
      </span>
      <hr />
      <div className={styles.address}>
        <span>{warehouse.name}</span>
        <span>{warehouse.street}</span>
        <span>
          {warehouse.postalCode} {warehouse.city} {warehouse.province}
        </span>
      </div>
      <hr />
      <div className={styles.address}>
        <span>SHIP TO: </span>
        <span>{destination.name}</span>
        <span>{destination.street}</span>
        <span>
          {destination.postalCode} {destination.city} {destination.province}
        </span>
      </div>
      <hr />
      <div className="flex flex-col">
        <span>
          Product: <strong>{product.product}</strong>
        </span>
        <span>
          {product.optionLabel}: <strong>{product.name}</strong>
        </span>
        <span>
          Product SKU: <strong>{ticket.productOption.sku}</strong>
        </span>
        <span>
          Quantity: <strong>{ticket.quantity}</strong>
        </span>
        {/* <span>Weight: </span>
        <span>Dimensions: </span> */}
      </div>
      <TicketQR ticket={ticket} />
    </div>
  );
};

const TicketQR = ({ ticket }: { ticket: Ticket }) => {
  return (
    <div className={styles.qrCode}>
      <QRCode
        value={window.location.origin + "/tickets/" + ticket.id}
        size={100}
        level="Q"
      />
    </div>
  );
};

export default PrintTickets;
