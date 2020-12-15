import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import API from "Helpers/api";
import BackNavigation from "Components/Helpers/BackNavigation";
import TitleUnderLine from "Components/Content/TitleUnderLine";
import Table from "Components/Table/List/Table";
import Search from "Components/Search/Search";
import Spinner from "Images/spinner.gif";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const DashboardTicketSearch = ({ supplierId }) => {
  const api = new API();
  let query = useQuery();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(query.get("search"));
  const [searchData, setSearchData] = useState();
  const getSearchResults = async () =>
    await api
      .getSearchTickets(supplierId, query.get("search"))
      .then((response) => {
        let data = response.data;
        data = data.map((item) => {
          let filterItemStatus = item.status;
          item.facility = item.supplier.name;
          delete item.supplier;
          delete item.order;
          delete item.status;
          item.status = filterItemStatus;
          return item;
        });
        setIsLoading(false);
        setSearchData(data);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getSearchResults();
  }, []);

  if (query.get("search") !== searchQuery) {
    setSearchQuery(query.get("search"));
    getSearchResults();
  }

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-8">
      {searchData && (
        <>
          <BackNavigation link="Back" />
          <div className="flex justify-between">
            <TitleUnderLine
              extraclasses="title-no-margin pt-0"
              nounderline={true}
              title={`Ticket search results for "${query.get("search")}"`}
            />
          </div>
          {searchData.length > 0 ? (
            searchData.map((table) => {
              return (
                <>
                  <Table
                    TableData={searchData}
                    link={"/dashboard/ticket/"}
                    buttonType="normal"
                  />
                </>
              );
            })
          ) : (
            <div>No results for {query.get("search")}</div>
          )}
        </>
      )}
      {isLoading && (
        <div
          className="relative w-3/4 min-h-screen"
          style={{ margin: "0 auto" }}
        >
          <img
            className="absolute left-0 right-0 spinner"
            style={{ maxWidth: 150 }}
            src={Spinner}
          />
        </div>
      )}
    </div>
  );
};

export default DashboardTicketSearch;
