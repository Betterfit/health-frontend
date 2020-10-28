import React, { useState, useEffect } from "react";
import Api from "Helpers/api";
import useStores from "Helpers/useStores";
import dayjs from "dayjs";

//components
import Modal from "Components/Content/Modal";
import DashboadOrderDetail from "Containers/DashboardOrderDetail";
import Table from "Components/Table/Detail/Table";
import StatusButton from "Components/Content/StatusButton";
import Button from "Components/Forms/Button";
import { _allowStateChangesInsideComputed } from "mobx";

const api = new Api();

const DashboardFacilityOrderDetail = (props) => {
  const { store } = useStores();
  const { match } = props;
  const orderId = parseInt(match.params.id);
  // ======================== Order Data ========================
  const [orderData, setOrderData] = useState(null);
  const [orderDataRaw, setOrderRaw] = useState(null);
  const [orderHeader, setOrderHeader] = useState();
  const userData = JSON.parse(localStorage.getItem("user"));
  const supplierId = userData.user_profile.supplier;
  const getData = async () =>
    await api
      .getOrder(orderId)
      .then((response) => {
        setOrderHeader({
          order_number: response.data.order_no,
          order_date: dayjs(response.data.order_date).format("MMM DD, YYYY"),
          facility: response.data.facility.name,
          unit: "Emergency",
        });
        let arr = response.data.order_products;
        setOrderRaw(response.data);
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
        setOrderData(arr);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getData();
  }, []);
  // ======================== End Ticket Data ========================

  const [modal, setModal] = useState(false);

  //Status for order
  const ActionComponent = (() => {
      return (
        <StatusButton
          status={orderDataRaw.status}
          extraClasses="font-semibold"
        />
      );
  })

  //Status for order
  const ActionButtons = () => {
    if (["draft"].includes(orderDataRaw.status)) {
      return (
        <div className="flex flex-row w-full justify-end px-7">
          <div className="flex flex-row space-x-3 sm:w-1/2 md:w-2/5 w-full">
            <Button text="Edit Order" solid={false} text_size="text-sm" />

            <Button
              onClick={confirmCallBack}
              text="Submit Order"
              color=" bg-betterfit-green"
              hoverColor="bg-green-800"
              text_size="text-sm"
            />
          </div>
        </div>
      );
    }
    return "";
  };

  const confirmCallBack = () => {
    let arr = orderDataRaw;
    arr.status = "shipped";
    let obj = {
      status: "shipped",
    };
    api
      .setUpdateTicket(supplierId, orderDataRaw.pk, obj)
      .then((response) => {
        getData();
        setModal(!modal);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const excludeKeys = ["pk", "product_image"];
  const excludeValues = ["pk"];

  return (
    <>
      {orderData && (
        <>
          <DashboadOrderDetail
            actionComponent={<ActionComponent></ActionComponent>}
            headerData={orderHeader}
          >
            <Table
              TableData={orderData}
              excludeKeys={excludeKeys}
              excludeValues={excludeValues}
            />
          </DashboadOrderDetail>
          <ActionButtons></ActionButtons>
        </>
      )}
    </>
  );
};

export default DashboardFacilityOrderDetail;
