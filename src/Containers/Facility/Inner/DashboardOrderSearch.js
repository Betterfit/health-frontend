import ButtonOption from "Components/Content/Menu/ButtonOption";
import PopupMenu from "Components/Content/Menu/PopUpMenu";
import TextOptions from "Components/Content/Menu/TextOption";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import BackNavigation from "Components/Helpers/BackNavigation";
import Table from "Components/Table/Full/Table";
import dayjs from "dayjs";
import API from "Helpers/api";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import uuid from "react-uuid";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const DashboardOrderSearch = ({}) => {
  const api = new API();
  let query = useQuery();
  const [searchQuery, setSearchQuery] = useState(query.get("search"));
  const [searchData, setSearchData] = useState();
  const getSearchResults = async () =>
    await api
      .getSearchOrders(query.get("search"))
      .then((response) => {
        let arr = response.data.map((item) => {
          let header = setHeader(item);
          header.order_products = item.order_products.map((products) => {
            let obj = {
              product_image: products.product_option.product_image,
              item: products.product_option.product_variation,
              size: products.product_option.name,
              quantity: products.quantity,
              priority: products.priority,
              pk: products.product_option.pk,
            };
            return obj;
          });
          return header;
        });
        setSearchData(arr);
      })
      .catch((err) => console.log(err));

  //set Header for title
  const setHeader = (data) => {
    //set options for menu for header
    const setOptions = (data) => {
      return (
        <PopupMenu>
          <TextOptions
            value="Edit"
            href={`edit-order/${data.pk}`}
          ></TextOptions>
          <TextOptions
            value="Delete"
            onClick={() => callbackDelete(data.pk, data.order_no)}
          ></TextOptions>
          <ButtonOption
            value="Submit"
            onClick={() => callbackSubmit(data.pk, data.order_no)}
          ></ButtonOption>
        </PopupMenu>
      );
    };

    return {
      purchase_ord: data.purchase_no,
      ordered_by:
        data.facility_admin.user.first_name +
        " " +
        data.facility_admin.user.last_name,
      ordered_on: dayjs(data.order_date).format("MMM D, YYYY hh:mmA"),
      order_no: data.order_no,
      status: data.status,
      id: data.pk,
      url: `/dashboard/orders/detail/${data.pk}`,
      options: data.status === "draft" ? setOptions(data) : [],
    };
  };

  //delete a draft order
  const callbackDelete = (orderId, orderNo) => {
    api
      .deleteOrder(orderId, orderNo)
      .then((response) => {
        getSearchResults();
      })
      .catch((error) => {
        console.error("Delete Error", error);
      });
  };

  //submit a draft order.
  const callbackSubmit = (orderId, orderNo) => {
    api
      .submitDraft(orderId, orderNo)
      .then((response) => {
        getSearchResults();
      })
      .catch((error) => {
        console.error("Submit Error", error);
      });
  };

  useEffect(() => {
    getSearchResults();
  }, []);

  if (query.get("search") !== searchQuery) {
    setSearchQuery(query.get("search"));
    getSearchResults();
  }

  const excludeKeys = ["pk", "product_image"];
  const excludeValues = ["pk"];
  return (
    <div>
      {searchData && (
        <>
          <BackNavigation link="Back" />
          <div className="flex justify-between mt-8">
            <TitleUnderLine
              extraclasses="title-no-margin pt-0"
              nounderline={true}
              title={`Order search results for "${query.get("search")}"`}
            />
          </div>
          {searchData.length > 0 ? (
            searchData.map((table) => {
              return (
                <>
                  <Table
                    TableData={table}
                    excludeKeys={excludeKeys}
                    excludeValues={excludeValues}
                    key={uuid()}
                  />
                </>
              );
            })
          ) : (
            <div>No results for {query.get("search")}</div>
          )}
        </>
      )}
    </div>
  );
};

export default DashboardOrderSearch;
