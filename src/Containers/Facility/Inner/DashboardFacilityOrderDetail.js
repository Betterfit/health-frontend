import React, { useState, useEffect } from "react";
import Api from "Helpers/api";
import useStores from "Helpers/useStores";
import dayjs from "dayjs";
import { _allowStateChangesInsideComputed } from "mobx";
import { useHistory } from "react-router-dom";
import {useAuthStore} from "Context/authContext";

//components
import DashboadOrderDetail from "Containers/DashboardOrderDetail";
import Table from "Components/Table/Detail/Table";
import StatusButton from "Components/Content/StatusButton";
import Button from "Components/Forms/Button";
import Modal from "Components/Content/AlertModal";

const api = new Api();

const DashboardFacilityOrderDetail = (props) => {
  const authStore = useAuthStore();
  const { match } = props;
  const orderId = parseInt(match.params.id);  
  const { store } = useStores();
  const history = useHistory();

  // ======================== Order Data ========================
  const [orderData, setOrderData] = useState(null);
  const [orderDataRaw, setOrderRaw] = useState(null);
  const [orderHeader, setOrderHeader] = useState();
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(false);


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

  const routeChange = () => {
    let path = `/dashboard/edit-order/${orderId}`;
    history.push(path);
  };

  //Status for order
  const ActionComponent = () => {
    return (
      <StatusButton status={orderDataRaw.status} extraClasses="font-semibold" />
    );
  };

  const confirmCallBack = () => {
    api
      .submitDraft(orderId, orderDataRaw.order_no)
      .then((response) => {
        getData();
        setError(false);
        setModal(!modal);
      })
      .catch((error) => {
        console.error("Error", error);
        setError(true);
        setModal(!modal);
      });
  };

  //Status for order
  const ActionButtons = () => {
    if (["draft"].includes(orderDataRaw.status)) {
      return (
        <div className="flex flex-row w-full justify-end px-7">
          <div className="flex flex-row space-x-3 sm:w-1/2 md:w-2/5 w-full">
            <Button
              text="Edit Order"
              solid={false}
              text_size="text-sm"
              onClick={routeChange}
            />

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
          {modal && (
            <Modal error={error} updateState={()=> setModal(!modal) }>
              {error &&
                `There was an error and we are unable to submit the order at this
                time.`}
              {!error && `Your order has been submitted.`}
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default DashboardFacilityOrderDetail;
