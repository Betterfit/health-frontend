import React, { useState, useEffect } from "react";
import Modal from "Components/Content/Modal";
import Button from "Components/Content/Button";
import DashboadOrderDetail from "Containers/DashboardOrderDetail";
import Table from "Components/Table/Detail/Table";
import Api from "Helpers/api";
import dayjs from "dayjs";
import { useAuthStore } from "Context/authContext";

const api = new Api();

const DashboardTicketDetail = (props) => {
  const authStore = useAuthStore();
  const { match } = props;
  const TicketId = parseInt(match.params.id);
  // ======================== Ticket Data ========================
  const [ticketData, setTicketData] = useState(null);
  const [ticketDataRaw, setTicketRaw] = useState(null);
  const [ticketHeader, setTicketHeader] = useState();
  const userData = JSON.parse(authStore.user);
  const supplierId = userData.user_profile.supplier;
  console.log(userData);
  const getData = async () =>
    await api
      .getSupplierTicketOrder(supplierId, TicketId)
      .then((response) => {
        // need ticket facility and info
        let facility = response.data.order.facility;
        setTicketHeader({
          order_number: response.data.ticket_no,
          facility: facility.name,
          unit: "Emergency",
          order_date: dayjs(response.data.ticket_date).format("MMM DD, YYYY"),
          shipping_address: facility.street
            ? `${facility.street}, ${facility.city}, ${facility.province}, ${facility.postal_code}`
            : "",
        });
        let arr = response.data.order.order_products;
        setTicketRaw(response.data);
        arr = arr.map((item) => {
          let obj = {
            product_image: item.product_option.product_image,
            item: item.product_option.product_variation,
            [item.product_option.option_label]: item.product_option.name,
            quantity: item.quantity,
            priority: item.priority,
          };
          return obj;
        });
        setTicketData(arr);
      })
      .catch((err) => console.log(err));
  useEffect(() => {
    getData();
  }, []);
  // ======================== End Ticket Data ========================

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
    let arr = ticketDataRaw;
    arr.status = "shipped";
    let obj = {
      status: "shipped",
    };
    api
      .setUpdateTicket(supplierId, ticketDataRaw.pk, obj)
      .then((response) => {
        getData();
        setModal(!modal);
      })
      .catch((error) => {
        console.error("Error", error);
      });
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
