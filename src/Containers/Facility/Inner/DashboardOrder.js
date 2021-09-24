import DashboardSideBar from "Components/DashboardSideBar/DashboardSideBar";
import CategoryList from "Containers/Facility/Inner/CategoryList";
import CategoryProductList from "Containers/Facility/Inner/CategoryProductList";
import DashboardEditOrder from "Containers/Facility/Inner/DashboardEditOrder";
import DashboardNewOrder from "Containers/Facility/Inner/DashboardNewOrder";
import DashboardProductDetail from "Containers/Facility/Inner/DashboardProductDetail";
import { useCartStore } from "Context/cartContext";
import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import DashboardProductSearch from "./DashboardProductSearch";

const DashboardOrder = ({ props, type }) => {
  const cartStore = useCartStore();
  const { match } = props;
  useEffect(() => {
    cartStore.getLocalCartStorage();
  }, []);
  return (
    <div className="flex flex-col md:flex-row">
      <DashboardSideBar addonStyles=" flex flex-col" padding="p-0">
        {type === "edit" && <DashboardEditOrder {...props} />}
        {type === "new" && <DashboardNewOrder {...props} />}
      </DashboardSideBar>
      <div className="w-full min-width-0 md:w-3/5 mx-auto h-screen md:overflow-y-scroll mt-2 relative">
        <Route exact path={`${match.path}`}>
          <CategoryList />
        </Route>
        <Route
          path={`${match.path}/:categoryName/:id?`}
          exact
          render={(props) => {
            return (
              <CategoryProductList
                edit={true}
                type={type}
                categoryId={props.match.params.id}
                orderId={
                  parseInt(match.params.oid) ? parseInt(match.params.oid) : null
                }
              />
            );
          }}
        />

        <Route
          path={`${match.path}/:categoryName/:cid/product/:pid/:id?`}
          exact
          render={({ match }) => {
            return (
              <DashboardProductDetail
                edit={true}
                productOptionId={Number(match.params.id)}
              />
            );
          }}
        />
        <Route
          exact
          path={[
            `${match.path}/:categoryName/:id?/search:query?`,
            `${match.path}/:id?/category/:categoryName/:oid?search:query?`,
          ]}
        >
          <DashboardProductSearch />
        </Route>
      </div>
    </div>
  );
};

export default DashboardOrder;
