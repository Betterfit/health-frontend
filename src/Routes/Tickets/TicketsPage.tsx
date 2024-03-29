import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import Tabs from "Components/Tabs/Tabs";
import { api } from "Helpers/typedAPI";
import { capitalize } from "lodash";
import React from "react";
import { useQuery } from "react-query";
import { Ticket } from "Types";
import PrintTickets from "./PrintTickets";
import TicketCard from "./TicketCard";
import styles from "./TicketsPage.module.css";
import TicketPageEmpty from "Images/ticketPageEmpty.png";

const TicketsPage = () => {
  return (
    <div className="page">
      <Title>Pick Tickets</Title>
      <Tickets />
    </div>
  );
};

/**
 * Handles bulk loading of tickets and filtering by status.
 * Todo: Searching, filter by facility
 */
const Tickets = () => {
  const statuses = ["open", "shipped", "delivered"];
  const ticketsQuery = useQuery<Ticket[], Error>(["tickets"], () =>
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
          heading: capitalize(status === "open" ? "outstanding" : status),
          // the term "outstanding" makes more sense than "open"
          key: status,
          amount: tickets.length,
          content:
            tickets.length === 0 && status === "open" ? (
              <TicketsPagePlaceholder />
            ) : (
              <TicketList tickets={tickets} />
            ),
        };
      })}
      headingComp={
        <PrintTickets
          tickets={tickets.filter((ticket) => ticket.status === "open")}
          label="Print Outstanding Tickets"
        />
      }
    />
  );
};

/*
  Placeholder component for zero amount of tickers in the default tab (outstanding tickets)
*/
const TicketsPagePlaceholder = () => (
  <div className="justify-center">
    <Title>Welcome to Supply Net!</Title>
    <p className="text-status-dark-blue text-center">
      You don't have any outstanding pick tickets. Feel free to explore the
      other
      <br />
      tabs to manage your stock levels, prices, users, and direst deposit info.
    </p>
    <img className="ml-auto mr-auto mt-8 mb-8" src={TicketPageEmpty} alt="" />
    <p className="text-status-dark-blue text-center">
      Have any questions? Click the help button.
    </p>
  </div>
);

const TicketList = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <div className={styles.ticketList}>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};
export default TicketsPage;
