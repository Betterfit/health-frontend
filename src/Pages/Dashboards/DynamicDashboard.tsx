import { useOrganization } from "APIHooks/organization";
import { useUserProfile } from "APIHooks/user";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import SideBar from "Components/SideBar/SideBar";
import DashboardContainer from "Containers/Facility/DashboardContainer";
import Dashboard from "Images/Icons/dashboard.svg";
import Inventory from "Images/Icons/inventory.svg";
import Matches from "Images/Icons/matches.svg";
import NewOrder from "Images/Icons/new-order.svg";
import Order from "Images/Icons/order.svg";
import Resources from "Images/Icons/resources.svg";
import Ticket from "Images/Icons/ticket.svg";
import orderBy from "lodash/orderBy";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Organization, UserProfile } from "Types";

export interface NavItem {
  to: string;
  name: string;
  icon: string;
  key: string;
  /** higher precedence nav items are displayed first*/
  precedence: number;
}

const DynamicDashboard = () => {
  const {
    data: userOrganization,
    isLoading: organizationLoading,
  } = useOrganization();
  const { data: userProfile, isLoading: userProfileLoading } = useUserProfile();
  if (organizationLoading || userProfileLoading) return <LoadingSpinner />;
  if (!userOrganization || !userProfile)
    return <div>Your account does not belong to an organization</div>;
  // these are what get displayed on the side bar
  const navItems = sortedNavItems(userOrganization, userProfile);
  return (
    <div className="md:h-screen flex-col md:flex-row flex overflow-hidden bg-white min-h-screen">
      <Router>
        <SideBar navItemsList={navItems} />
        <DashboardContainer />
      </Router>
    </div>
  );
};

const sortedNavItems = (
  myOrganization: Organization,
  userProfile: UserProfile
) => {
  const navItems: NavItem[] = [
    {
      to: "/dashboard/resources",
      name: "Resources",
      icon: Resources,
      key: "resources",
      precedence: 0,
    },
  ];

  if (myOrganization?.isPurchaser) {
    navItems.push(
      ...[
        {
          to: "/dashboard/new-order/category/",
          name: "New Order",
          icon: NewOrder,
          key: "new-order",
          precedence: 3,
        },
        {
          to: "/dashboard/orders",
          name: "Orders",
          icon: Order,
          key: "order",
          precedence: 2,
        },
      ]
    );
    if (myOrganization.isAdmin)
      navItems.push(
        ...[
          {
            to: "/dashboard/traffic-dashboard",
            name: "Dashboard",
            icon: Dashboard,
            key: "traffic-dashboard",
            precedence: 3,
          },
          {
            to: "/dashboard/matches",
            name: "Matches",
            icon: Matches,
            key: "matches",
            precedence: 2,
          },
          {
            to: "/dashboard/inventory",
            name: "Inventory",
            icon: Inventory,
            key: "inventory",
            precedence: 1,
          },
        ]
      );
  }

  if (myOrganization?.isSupplier) {
    navItems.push(
      ...[
        {
          to: "/dashboard/tickets",
          name: "Tickets",
          icon: Ticket,
          key: "tickets",
          precedence: 3,
        },
        {
          to: "/dashboard/inventory",
          name: "Inventory",
          icon: Inventory,
          key: "inventory",
          precedence: 2,
        },
      ]
    );
  }
  return orderBy(navItems, ["precedence"], ["desc"]);
};

export default DynamicDashboard;
