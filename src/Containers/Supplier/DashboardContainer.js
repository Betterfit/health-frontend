import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import DashboardResources from "../DashboardResources";
import DashboardInventory from "./Inner/DashboardInventory";
import DashboardTicketDetail from "./Inner/DashboardTicketDetail";
import DashboardTickets from "./Inner/DashboardTickets";

const DashboardContainer = () => {
  return (
    <div className="flex flex-col w-full md:w-0 flex-1 overflow-hidden md:flex-row">
      <main
        className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
        tabIndex="0"
      >
        <AnimatedSwitch
          atEnter={{ opacity: 0 }}
          atLeave={{ opacity: 0 }}
          atActive={{ opacity: 1 }}
          className="switch-wrapper"
        >
          <Route
            exact
            path="/dashboard"
            render={() => <Redirect to="/dashboard/inventory" />}
          />
          <Route path="/dashboard/tickets/">
            <DashboardTickets />
          </Route>
          <Route
            exact
            path="/dashboard/ticket/:id"
            render={(props) => {
              return <DashboardTicketDetail {...props} />;
            }}
          />
          <Route path="/dashboard/inventory">
            <DashboardInventory
              initial
            />
          </Route>
          <Route path="/dashboard/resources">
            <DashboardResources
              initial
            />
          </Route>
        </AnimatedSwitch>

        {/* <!-- /End replace --> */}
      </main>
    </div>
  );
};

export default DashboardContainer;
