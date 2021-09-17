import Button from "Components/Content/Button";
import Modal from "Components/Content/Modal";
import Table from "Components/Table/Detail/Table";
import DashboadOrderDetail from "Containers/DashboardOrderDetail";
import dayjs from "dayjs";
import Api from "Helpers/api";
import { useSelectedFacility } from "Models/facilities";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const api = new Api();

const DashboardTicketDetail = ({ match }) => {
  const ticketId = parseInt(match.params.id);
  const { facilityId } = useSelectedFacility();
  const ticketQuery = useQuery(
    ["tickets", { ticketId: ticketId, facilityId }],
    () =>
      api.getSupplierTicketOrder(facilityId, ticketId).then((response) => {
        // need ticket facility and info
        let facility = response.data.order.facility;
        const ticketHeader = {
          order_number: response.data.ticket_no,
          facility: facility.name,
          unit: "Emergency",
          order_date: dayjs(response.data.ticket_date).format("MMM DD, YYYY"),
          shipping_address: facility.street
            ? `${facility.street}, ${facility.city}, ${facility.province}, ${facility.postal_code}`
            : "",
        };
        let arr = response.data.order.order_products;
        const ticketDataRaw = response.data;
        const ticketData = arr.map((item) => {
          let obj = {
            product_image: item.product_option.product_image,
            item: item.product_option.product_variation,
            [item.product_option.option_label]: item.product_option.name,
            quantity: item.quantity,
            priority: item.priority,
          };
          return obj;
        });
        return { ticketHeader, ticketDataRaw, ticketData };
      }),
    { disabled: !facilityId }
  );
  const queryClient = useQueryClient();
  const ticketMutation = useMutation(
    () =>
      api.setUpdateTicket(facilityId, ticketDataRaw.pk, { status: "shipped" }),
    { onSuccess: () => queryClient.invalidateQueries(["tickets"]) }
  );

  const { ticketHeader, ticketDataRaw, ticketData } = ticketQuery.data || {};
  const [modal, setModal] = useState(false);

  const actionComponent = (
    <div className="absolute top-0 right-0">
      <Button
        text={
          ticketDataRaw && ticketDataRaw.status === "shipped"
            ? "Shipped"
            : "Mark as Shipped"
        }
        color={"status-dark-green"}
        text_size="text-sm"
        onClick={
          ticketDataRaw && ticketDataRaw.status === "shipped"
            ? () => {
                return false;
              }
            : () => setModal(!modal)
        }
      />
    </div>
  );
  const confirmCallBack = () => {
    ticketMutation.mutate(null, { onSuccess: () => setModal(!modal) });
  };

  const excludeKeys = ["pk", "product_image", "name", "product_variation"];
  const excludeValues = ["pk", "product_variation", "name"];

  return (
    <>
      {ticketData && (
        <>
          <DashboadOrderDetail
            actionComponent={actionComponent}
            headerData={ticketHeader}
          >
            <Table
              TableData={ticketData}
              excludeKeys={excludeKeys}
              excludeValues={excludeValues}
            />
          </DashboadOrderDetail>
          <>
            {modal && (
              <Modal
                cancelCallBack={() => setModal(!modal)}
                confirmCallBack={confirmCallBack}
                buttonText="Mark as Shipped"
              >
                <div className="px-6 py-4 border-b border-gray-300">
                  <h2 className="text-betterfit-navy text-xl">
                    Mark Order As Shipped
                  </h2>
                </div>
                <div className="py-6 px-6">
                  <p className="text-paragraph text-base">
                    Are you sure you’re ready to mark this order as shipped and
                    close the ticket?{" "}
                  </p>
                </div>
              </Modal>
            )}
          </>
        </>
      )}
    </>
  );
};

export default DashboardTicketDetail;
