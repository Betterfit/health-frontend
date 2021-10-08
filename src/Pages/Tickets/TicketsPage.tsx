import clsx from "clsx";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import Dialog from "Components/Dialog";
import PrettyButton from "Components/Forms/PrettyButton/PrettyButton";
import { HorizontalDetail } from "Components/InfoDisplay/LabeledDetails";
import Tabs from "Components/Tabs/Tabs";
import { api } from "Helpers/typedAPI";
import { formatTimeStamp } from "Helpers/utils";
import { capitalize } from "lodash";
import { productDisplayName } from "Models/products";
import QRCode from "qrcode.react";
import React, { ReactNode, useState } from "react";
import { useQuery } from "react-query";
import { SupplierTicket } from "Types";
import MarkShippedForm from "./MarkShippedForm";
import styles from "./TicketsPage.module.css";

const TicketsPage = () => {
  return (
    <div className={styles.root}>
      <Title text="Ticket" />
      <Tickets />
    </div>
  );
};

const Tickets = () => {
  const statuses = ["open", "shipped", "delivered"];
  const ticketsQuery = useQuery<SupplierTicket[], Error>(["tickets"], () =>
    api.getTickets().then((response) => response.data)
  );
  if (ticketsQuery.isLoading || ticketsQuery.isIdle)
    return <LoadingSpinner bubbleColor="gray" />;
  if (ticketsQuery.isError)
    return <div>Error: {ticketsQuery.error.message}</div>;
  const { data: tickets } = ticketsQuery;
  const ticketsWithStatus = (status: string) =>
    status === "all"
      ? tickets
      : tickets.filter((order) => order.status === status);
  return (
    <Tabs
      amount
      tabs={statuses.map((status) => {
        const tickets = ticketsWithStatus(status);
        return {
          heading: capitalize(status),
          key: status,
          amount: tickets.length,
          content: <TicketList tickets={tickets} />,
        };
      })}
    />
  );
};

const TicketList = ({ tickets }: { tickets: SupplierTicket[] }) => {
  return (
    <div className={styles.ticketList}>
      {tickets.map((ticket) => (
        <TicketCard ticket={ticket} />
      ))}
    </div>
  );
};

const TicketCard = ({ ticket }: { ticket: SupplierTicket }) => {
  const product = ticket.orderProduct.productOption;
  const { destination, purchaser, orderProduct } = ticket;
  // const history = useHistory();
  // const basePath = "/dashboard/tickets";
  // const markShippedPath = `${basePath}/${ticket.id}/mark-shipped`;
  const [markingShipped, setMarkingShipped] = useState(false);
  return (
    <div className={styles.ticket}>
      <TicketDetail label="Purchaser" value={purchaser.name} />
      <TicketDetail label="Destination" value={destination.name} />
      {/* <TicketDetail label="Address to" value="John Doe" /> */}
      <TicketDetail label="Ticket Id" value={ticket.id} />
      <TicketDetail
        label="Assigned On"
        value={formatTimeStamp(ticket.timeCreated)}
      />
      <TicketDetail label="Shipping Address">
        <span>{destination.name}</span>
        <span>{destination.street}</span>
        <span>
          {destination.city} {destination.province} {destination.postalCode}
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
      <div className={styles.qrCode}>
        <QRCode
          value={window.location.origin + "/tickets/" + ticket.id}
          size={128}
          // imageSettings={{
          //   src: "https://betterfit.com/betterfit-favicon.png",
          //   width: 32,
          //   height: 32,
          // }}
          width={128}
          height={128}
          level="Q"
        />
      </div>
      <div className={styles.actions}>
        {ticket.status === "open" && (
          <PrettyButton
            text="Mark Shipped"
            color="green"
            // onClick={() => history.push(markShippedPath)}
            onClick={() => setMarkingShipped(true)}
          />
        )}
        <PrettyButton text="Print QR Code" />
      </div>
      <Dialog
        open={
          markingShipped
          // ticket.status !== "shipped" &&
          // history.location.pathname === markShippedPath
        }
        onClose={() => setMarkingShipped(false)}
      >
        <MarkShippedForm
          ticket={ticket}
          onClose={() => setMarkingShipped(false)}
        />
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

export default TicketsPage;
