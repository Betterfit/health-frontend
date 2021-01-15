import BackNavigation from "Components/Helpers/BackNavigation";
import Table from "Components/Table/MatchSort/Table";
import dayjs from "dayjs";
import Api from "Helpers/api";
import Spinner from "Images/spinner.gif";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const api = new Api();
const DashboardMatchesHistory = ({ props }) => {
  let query = useQuery();
  const date = query.get("date");
  console.log(date);
  const [matchesData, setMatchesData] = useState(null);
  const [matchHeaderData, setMatchHeaderData] = useState({
    order_date: "",
    matches: "",
    time_till_processed: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () =>
    await api
      .getMatchHistoryDate(date)
      .then((response) => {
        setMatchHeaderData({
          order_date: dayjs(date).format("MMM D , YYYY"),
          matches: response.data.total_matches
            ? `${response.data.total_matches}/${response.data.total_orders}`
            : null,
          time_till_processed: response.data.cutoff_time_2
            ? response.data.cutoff_time_2
            : null,
        });
        let arr = response.data;
        // console.log(arr);
        arr = arr.map((item) => {
          let obj = {
            order_no: item.order_no,
            province: item.province,
            facility: item.facility,
            supplier: item.supplier !== "No match" ? item.supplier : null,
            order_date: item.order_date,
            // rank:item.rank,
            pk: item.pk,
          };
          return obj;
        });
        console.log(arr);
        setMatchesData(arr);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getData();
  }, []);

  const HeadingComponent = ({ title, value, classes, time }) => {
    if (time) {
      // console.log(value);
      return (
        <div
          className={
            "flex flex-col pr-6 md:pr-12 lg:pr-16 md:pb-3 py-3 md:py-1 max-w-1/2 items-end" +
            (classes ? classes : "")
          }
        >
          <span className="uppercase betterfit-graphite text-xxs tracking-extra-wide opacity-50">
            {title}
          </span>
          <span className="text-betterfit-graphite text-base word break-words text-2xl">
            <Countdown date={Date.parse(value)}></Countdown>
          </span>
        </div>
      );
    } else {
      return (
        <div
          className={
            "flex flex-col pr-6 md:pr-12 lg:pr-16 md:pb-3 py-3 md:py-1 max-w-1/2 items-end" +
            (classes ? classes : "")
          }
        >
          <span className="uppercase betterfit-graphite text-xxs tracking-extra-wide opacity-50">
            {title}
          </span>
          <span className="text-betterfit-graphite text-base word break-words text-2xl">
            {value}
          </span>
        </div>
      );
    }
  };

  const HeadingComponentTitle = ({ value, classes }) => {
    return (
      <div
        className={
          "flex flex-col pr-4 md:pb-3 py-3 md:py-1 " + (classes ? classes : "")
        }
      >
        <span className="text-betterfit-graphite text-3xl">{value}</span>
      </div>
    );
  };
  return (
    <div className="px-4 sm:px-6 md:px-8 pt-10">
      {/* heading */}
      {isLoading ? (
        <div
          className="relative w-3/4 min-h-screen"
          style={{ margin: "0 auto" }}
        >
          <img
            className="absolute left-0 right-0 spinner"
            style={{ maxWidth: 150 }}
            src={Spinner}
            alt="Loading"
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-end">
            <div>
              <BackNavigation link={"Back to matches"} />
              <HeadingComponentTitle value={`${matchHeaderData.order_date}`} />
            </div>
            <div className="w-full md:w-1/2 flex justify-end ">
              <div className="flex flex-row mt-4 items-center">
                {matchHeaderData.matches && (
                  <HeadingComponent
                    title="Matches"
                    value={matchHeaderData.matches}
                  />
                )}
                {matchHeaderData.time_till_processed && (
                  <HeadingComponent
                    title="Time Till Processed"
                    value={matchHeaderData.time_till_processed}
                    time={true}
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            {matchesData && (
              <>
                {matchesData.length ? (
                  <Table
                    sort={false}
                    TableData={matchesData}
                    link={`/dashboard/matches/`}
                  />
                ) : (
                  <div className="h-40 w-3/4 flex items-center">
                    {" "}
                    <h3 className="font-semibold text-xl text-betterfit-graphite">
                      No Matches
                    </h3>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default DashboardMatchesHistory;
