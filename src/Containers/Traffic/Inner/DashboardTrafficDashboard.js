import TitleUnderLine from "Components/Content/TitleUnderLine";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import ControllerCard from "Components/TrafficControllerSideBar/ControllerCard";
import Api from "Helpers/api";
import Translator from "Helpers/Translator";
import Spinner from "Images/spinner.gif";
import React, { useEffect, useState } from "react";
import Graph from "./DashboardGraph";


const api = new Api();
const DashboardTrafficDashboard = () => {
  const [ProductData, setProductData] = useState(null);
  const [loading, setLoaded] = useState(true);
  const getData = async () =>
    await api
      .getTrafficControllerSupply()
      .then((response) => {
        setProductData(response.data);
        setLoaded(false);
      })
      .catch((err) => console.log(err));

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row">
      {!loading ? (
        <>
          <DashboardSideBar>
            <TitleUnderLine title={`Supply`} />
            {ProductData &&
              ProductData.map((product) => {
                return (
                  <div
                    key={`controllercard_${product.name}_parent`}
                    className="flex flex-col mb-4"
                  >
                    <div className="flex flex-row justify-between m-1 px-4">
                      <span className="text-10 leading-4 tracking-extra-wide uppercase text-betterfit-graphite font-semibold opacity-50">
                        {product.name}
                      </span>
                      <div className="flex items-start">
                        <span className="text-10 leading-4 uppercase tracking-extra-wide uppercase text-betterfit-graphite mr-2 font-semibold opacity-50">
                          {Translator("Orders")}
                        </span>
                        <span className="text-10 leading-4 uppercase tracking-extra-wide uppercase text-betterfit-graphite ml-2 font-semibold opacity-50">
                          {Translator("Supply")}
                        </span>
                      </div>
                    </div>
                    {product.products.map((p, index) => {
                      // status [critical,normal,warn],
                      // name - the name of the product
                      // orders - the quantity of orders
                      // supply - the quantity of supply
                      let cardData = {
                        name: p.name,
                        status: p.status,
                        orders: p.orders_count,
                        supply: p.supply_count,
                      };
                      return (
                        <ControllerCard
                          key={`controllercard_${product.name}_${index}`}
                          products={cardData}
                        />
                      );
                    })}
                  </div>
                );
              })}
          </DashboardSideBar>
          <div
            className={`w-full lg:relative lg:w-3/5 mx-auto h-screen overflow-y-scroll mt-8`}
          >
            <h2 className="text-dark-blue text-2xl pb-6 ml-3 border-b border-title-border mb-3 self-start">
              COVID-19 Data
            </h2>
            <Graph />
          </div>
        </>
      ) : (
        <div className="relative w-full min-h-screen">
          <img
            className="absolute left-0 right-0 spinner"
            style={{ maxWidth: 150 }}
            src={Spinner}
            alt="Loading"
          />
        </div>
      )}
    </div>
  );
};

export default DashboardTrafficDashboard;
