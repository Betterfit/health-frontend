import BoxLink from "Components/Content/BoxLink";
import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import Search from "Components/Search/Search";
import Tabs from "Components/Tabs/Tabs";
import DashboardProductList from "Containers/DashboardProductList";
import DashboardProductDetail from "Containers/Supplier/Inner/DashboardProductDetail";
import Api from "Helpers/api";
import Translator from "Helpers/Translator";
import Spinner from "Images/spinner.gif";
import { useSelectedFacility } from "Models/facilities";
import React, { useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";

const DashboardInventory = () => {
  const api = new Api();
  const [AllCategoryData, setAllCategoryData] = useState(null);
  const [SupplierCategoryData, setSupplierCategoryData] = useState(null);
  const [activeTab, setActiveTab] = useState("my-inventory");
  const location = useLocation();
  const { facilityId } = useSelectedFacility();
  const [TabData, setTabData] = useState([]);

  let query = new URLSearchParams(location.search);
  const getAllCategories = async () =>
    await api
      .getProductCategories()
      .then((response) => {
        setAllCategoryData(response.data);
      })
      .catch((err) => console.log(err));

  const getSupplierCategories = async () =>
    await api
      .getCategoriesBySupplier(facilityId)
      .then((response) => {
        setSupplierCategoryData(response.data);
      })
      .catch((err) => console.log(err));

  const createProductCategoryList = (productCategory, showAll = false) =>
    productCategory.map((product, i) => {
      return (
        <div key={i}>
          <h3 className="mb-4 md:mb-2 text-gray-700 text-xs font-body ml-4 uppercase font-bold tracking-wider">
            {product.name}
          </h3>
          <div className="grid md:grid-cols-1 gap-2 mb-6 md:mb-8">
            {product.products.map((p, j) => {
              return (
                <BoxLink
                  key={j}
                  to={`/dashboard/inventory/product/${p.pk}${
                    showAll ? "/all" : ""
                  }`}
                  link={p.name}
                  textColor="dark-blue"
                />
              );
            })}
          </div>
        </div>
      );
    });
  const setTabs = () => {
    setTabData([
      {
        heading: "My Inventory",
        content: createProductCategoryList(SupplierCategoryData),
        key: "my-inventory",
      },
      {
        heading: "All Products",
        content: createProductCategoryList(
          AllCategoryData.filter((category) => category.products.length > 0),
          true
        ),
        key: "all-products",
      },
    ]);
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    if (AllCategoryData) {
      getSupplierCategories();
    }
    console.log(AllCategoryData);
  }, [AllCategoryData]);

  useEffect(() => {
    if (SupplierCategoryData) {
      setTabs();
    }
  }, [SupplierCategoryData]);

  return (
    <>
      {TabData.length > 0 ? (
        <div className="flex flex-col md:flex-row">
          <DashboardSideBar padding="">
            <div className="pt-4 px-4">
              <h2 className="text-3xl text-dark-blue my-3">
                {Translator("Inventory")}
              </h2>
            </div>
            <Tabs
              tabs={TabData}
              amount={false}
              tabCallBack={(val) => {
                setActiveTab(val);
              }}
              headingComp={<Search type="icon" activeTab={activeTab} />}
              setActive={
                query.get("search") && !query.get("supplier")
                  ? "all-products"
                  : "my-inventory"
              }
            />
          </DashboardSideBar>
          <div
            className={`absolute w-full lg:relative lg:w-3/5 mx-auto h-screen overflow-y-scroll bg-white ${
              location.pathname === "/dashboard/inventory" ? `z-0` : `z-10`
            }`}
          >
            <Route exact path="/dashboard/inventory/product/:id">
              <DashboardProductList />
            </Route>
            <Route path="/dashboard/inventory/product/:id/all">
              <DashboardProductList showAll />
            </Route>
            <Route
              path="/dashboard/inventory/product/:id/detail/:oid?/edit"
              exact
              render={(props) => {
                return <DashboardProductDetail edit={true} {...props} />;
              }}
            />
          </div>
        </div>
      ) : (
        <div className="relative w-full min-h-screen">
          <img
            className="absolute left-0 right-0 spinner"
            style={{ maxWidth: 150 }}
            src={Spinner}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default DashboardInventory;
