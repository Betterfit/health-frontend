import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import Title from "Components/Content/Title";
import BackNavigation from "Components/Helpers/BackNavigation";
import TransferCard from "Components/Payment/TransferCard";
import { api } from "Helpers/typedAPI";
import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import TicketCard from "./TicketCard";

const TicketDetail = ({ ticketId }: { ticketId: number }) => {
  const { data: ticket } = useQuery(["ticket", { id: ticketId }], () =>
    api.getTicket(ticketId).then((res) => res.data)
  );
  const { data: transfer } = useQuery(["transfer", { ticketId }], () =>
    api.getTransfer(ticketId)
  );
  const history = useHistory();
  return (
    <div className="page flex flex-col items-center">
      <BackNavigation
        link="Back to Tickets"
        onClickOverride={() => history.push("/dashboard/tickets")}
      />
      <Title>Pick Ticket #{ticketId}</Title>
      {ticket ? <TicketCard ticket={ticket} /> : <LoadingSpinner />}
      <hr className="my-4" />
      {transfer && <h2 className="text-2xl">Transfer</h2>}
      {transfer && <TransferCard transfer={transfer} />}
    </div>
  );
};

export default TicketDetail;
