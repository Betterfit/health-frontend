import { useOrganization } from "APIHooks/organization";
import { useUserProfile } from "APIHooks/user";
import { LoadingSpinner } from "Components/Content/LoadingSpinner";
import SideBarIcon from "Components/SideBar/SideBar";
import AccountsIcon from "Images/Icons/accounts.svg";
import DashboardIcon from "Images/Icons/dashboard.svg";
import InventoryIcon from "Images/Icons/inventory.svg";
import MatchesIcon from "Images/Icons/matches.svg";
import NewOrderIcon from "Images/Icons/new-order.svg";
import OrderIcon from "Images/Icons/order.svg";
import ResourcesIcon from "Images/Icons/resources.svg";
import TicketIcon from "Images/Icons/ticket.svg";
import orderBy from "lodash/orderBy";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Organization, UserProfile } from "Types";
import DashboardRoutes from "./DashboardRoutes";

export interface NavItem {
  to: string;
  name: string;
  icon: string;
  key: string;
  /** higher precedence nav items are displayed first*/
  precedence: number;
}

/**
 * Dashboard that dynamically decides which pages should be displayed to the user.
 * For example, the account management screen is only shown to admins.
 */
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
        <SideBarIcon navItemsList={navItems} />
        <DashboardRoutes navItems={navItems} />
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
      icon: ResourcesIcon,
      key: "resources",
      precedence: 0,
    },
  ];
  if (myOrganization.isAdmin) {
    navItems.push({
      to: "/dashboard/accounts",
      name: "Accounts",
      icon: AccountsIcon,
      key: "accounts",
      precedence: 5,
    });
  }
  if (myOrganization?.isPurchaser) {
    navItems.push(
      ...[
        {
          to: "/dashboard/new-order/category/",
          name: "New Order",
          icon: NewOrderIcon,
          key: "new-order",
          precedence: 3,
        },
        {
          to: "/dashboard/orders",
          name: "Orders",
          icon: OrderIcon,
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
            icon: DashboardIcon,
            key: "traffic-dashboard",
            precedence: 3,
          },
          {
            to: "/dashboard/matches",
            name: "Matches",
            icon: MatchesIcon,
            key: "matches",
            precedence: 2,
          },
          {
            to: "/dashboard/inventory",
            name: "Inventory",
            icon: InventoryIcon,
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
          icon: TicketIcon,
          key: "tickets",
          precedence: 3,
        },
        {
          to: "/dashboard/inventory",
          name: "Inventory",
          icon: InventoryIcon,
          key: "inventory",
          precedence: 2,
        },
      ]
    );
  }
  return orderBy(navItems, ["precedence"], ["desc"]);
};

export default DynamicDashboard;
