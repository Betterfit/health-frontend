import { MatchProvider } from "Context/matchContext";
import React, { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import DashboardResources from "../DashboardResources";
import DashboardMatches from "./Inner/DashboardMatches";
import DashboardMatchesHistory from "./Inner/DashboardMatchesHistory";
import DashboardMatchesListing from "./Inner/DashboardMatchesListing";
import DashboardMatchesOrderDetail from "./Inner/DashboardMatchesOrderDetail";
import DashboardTrafficDashboard from "./Inner/DashboardTrafficDashboard";
import DashboardTrafficInventory from "./Inner/DashboardTrafficInventory";

const DashboardContainer = () => {
  const [title, setTitle] = useState("");
  const changeTitle = (title) => {
    setTitle(title);
  };
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
            render={() => <Redirect to="/dashboard/matches" />}
          />
          <Route exact path="/dashboard/matches">
            <DashboardMatchesListing />
          </Route>
          <Route exact path="/dashboard/matches/current">
            <MatchProvider>
              <DashboardMatches />
            </MatchProvider>
          </Route>
          <Route
            exact
            path="/dashboard/matches/history:query?"
            render={(props) => {
              return <DashboardMatchesHistory {...props} />;
            }}
          />
          <Route
            exact
            path="/dashboard/matches/:id/"
            render={(props) => {
              return <DashboardMatchesOrderDetail {...props} />;
            }}
          />
          <Route path="/dashboard/traffic-dashboard">
            <DashboardTrafficDashboard />
          </Route>
          <Route path="/dashboard/inventory">
            <DashboardTrafficInventory
              initial
              changeTitle={(title) => changeTitle(title)}
            />
          </Route>
          <Route path="/dashboard/resources">
            <DashboardResources
              initial
              changeTitle={(title) => changeTitle(title)}
            />
          </Route>
          {/* <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                     */}
        </AnimatedSwitch>
      </main>
    </div>
  );
};

export default DashboardContainer;
