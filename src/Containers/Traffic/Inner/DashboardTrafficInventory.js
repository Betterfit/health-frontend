import BoxLink from "Components/Content/BoxLink";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import Search from "Components/Search/Search";
import Tabs from "Components/Tabs/Tabs";
import DashboardProductList from "Containers/DashboardProductList";
import DashboardSearch from "Containers/DashboardSearch";
import { useAuthStore } from "Context/authContext";
import Api from "Helpers/api";
import Translator from "Helpers/Translator";
import Spinner from "Images/spinner.gif";
import React, { useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import uuid from "react-uuid";
import DashboardProductDetail from "./DashboardProductDetail";

const api = new Api();

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const DashboardInventory = () => {
  const [title, setTitle] = useState("Inventory");
  const [AllCategoryData, setAllCategoryData] = useState(null);
  const [activeTab, setActiveTab] = useState("all-products");
  const location = useLocation();
  const authStore = useAuthStore();
  const [TabData, setTabData] = useState([]);
  const getAllCategories = async () =>
    await api
      .getProductCategories()
      .then((response) => {
        setAllCategoryData(response.data);
      })
      .catch((err) => console.log(err));

  const setTabs = () => {
    setTabData([
      {
        heading: "All Products",
        content: AllCategoryData.filter(
          (category) => category.products.length > 0
        ).map((product) => {
          return (
            <div key={uuid()}>
              <h3 className="mb-4 md:mb-2 font-extrabold text-gray-700 text-xs font-body ml-4 uppercase font-bold tracking-wider">
                {product.name}
              </h3>
              <div className="grid md:grid-cols-1 gap-2 mb-6 md:mb-8">
                {product.products.map((p) => {
                  return (
                    <BoxLink
                      key={uuid()}
                      to="/dashboard/inventory/product/"
                      link={p.name}
                      textColor="dark-blue"
                      id={p.pk}
                    />
                  );
                })}
              </div>
            </div>
          );
        }),
        key: "all-products",
      },
    ]);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (AllCategoryData) {
      setTabs();
    }
  }, [AllCategoryData]);

  return (
    <>
      {TabData.length > 0 ? (
        <div className="flex flex-col md:flex-row">
          <DashboardSideBar padding="">
            <div className="pt-4 px-4">
              <h2 className="text-3xl text-dark-blue my-3">
                {Translator(title)}
              </h2>
            </div>
            <Tabs
              tabs={TabData}
              amount={false}
              tabCallBack={(val) => {
                setActiveTab(val);
              }}
              headingComp={<Search type="icon" activeTab={activeTab} />}
            />
          </DashboardSideBar>
          <div
            className={`absolute w-full lg:relative lg:w-3/5 mx-auto h-screen overflow-y-scroll bg-white ${
              location.pathname === "/dashboard/inventory" ? `z-0` : `z-10`
            }`}
          >
            <Route
              exact
              path="/dashboard/inventory/product/:id"
              exact
              render={(props) => {
                return <DashboardProductList {...props} edit={false} />;
              }}
            />
            <Route
              path="/dashboard/inventory/product/:id/detail/:oid"
              exact
              render={(props) => {
                return <DashboardProductDetail {...props} />;
              }}
            />
            <Route path="/dashboard/inventory/search:query?">
              <DashboardSearch />
            </Route>
          </div>
        </div>
      ) : (
        <div className="relative w-full min-h-screen">
          <img
            className="absolute left-0 right-0 spinner"
            style={{ maxWidth: 150 }}
            src={Spinner}
          />
        </div>
      )}
    </>
  );
};

export default DashboardInventory;
