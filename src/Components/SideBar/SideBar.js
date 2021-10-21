import logo from "Images/Icons/logo-full.svg";
import { useOrganization } from "Models/organization";
import { fullName, useMyProfile } from "Models/user";
import React from "react";
import SideBarDashboardTypeCTA from "./SideBarDashboardTypeCTA";
import SideBarNavigation from "./SideBarNavigation";
import SideBarProfile from "./SideBarProfile";

const SideBar = ({ navItemsList }) => {
  const myProfileQuery = useMyProfile();
  const organizationQuery = useOrganization();

  let userName = "";
  let orgName = "";
  if (myProfileQuery.isSuccess) {
    const user = myProfileQuery.data;
    userName = user.firstName ? fullName(user) : user.email;
  }
  if (organizationQuery.isSuccess) {
    orgName = organizationQuery.data.name;
  }

  return (
    <div className="md:flex sidebar">
      <div className="flex flex-col sidebar md:p-2 md:pr-0 w-full">
        <div
          className="flex flex-col md:h-0 flex-1 relative rounded-lg m-2 mb-0 md:m-0"
          style={{
            // backgroundImage: "linear-gradient(120deg, #6D2CFF, #1332C7)",
            backgroundImage:
              "linear-gradient(351deg, rgba(54, 54, 54, 0.05) 0%, rgba(54, 54, 54, 0.05) 33.333%,rgba(85, 85, 85, 0.05) 33.333%, rgba(85, 85, 85, 0.05) 66.666%,rgba(255, 255, 255, 0.05) 66.666%, rgba(255, 255, 255, 0.05) 99.999%),linear-gradient(398deg, rgba(81, 81, 81, 0.05) 0%, rgba(81, 81, 81, 0.05) 33.333%,rgba(238, 238, 238, 0.05) 33.333%, rgba(238, 238, 238, 0.05) 66.666%,rgba(32, 32, 32, 0.05) 66.666%, rgba(32, 32, 32, 0.05) 99.999%),linear-gradient(185deg, rgba(192, 192, 192, 0.05) 0%, rgba(192, 192, 192, 0.05) 33.333%,rgba(109, 109, 109, 0.05) 33.333%, rgba(109, 109, 109, 0.05) 66.666%,rgba(30, 30, 30, 0.05) 66.666%, rgba(30, 30, 30, 0.05) 99.999%),linear-gradient(234deg, rgba(77, 77, 77, 0.05) 0%, rgba(77, 77, 77, 0.05) 33.333%,rgba(55, 55, 55, 0.05) 33.333%, rgba(55, 55, 55, 0.05) 66.666%,rgba(145, 145, 145, 0.05) 66.666%, rgba(145, 145, 145, 0.05) 99.999%),linear-gradient(135deg, rgb(109,44,255),rgb(19,50,199))",
            // "radial-gradient(circle at 15% 59%, rgba(101, 101, 101,0.04) 0%, rgba(101, 101, 101,0.04) 50%,rgba(44, 44, 44,0.04) 50%, rgba(44, 44, 44,0.04) 100%),radial-gradient(circle at 47% 11%, rgba(240, 240, 240,0.04) 0%, rgba(240, 240, 240,0.04) 50%,rgba(29, 29, 29,0.04) 50%, rgba(29, 29, 29,0.04) 100%),radial-gradient(circle at 73% 44%, rgba(252, 252, 252,0.04) 0%, rgba(252, 252, 252,0.04) 50%,rgba(130, 130, 130,0.04) 50%, rgba(130, 130, 130,0.04) 100%),radial-gradient(circle at 72% 91%, rgba(234, 234, 234,0.04) 0%, rgba(234, 234, 234,0.04) 50%,rgba(48, 48, 48,0.04) 50%, rgba(48, 48, 48,0.04) 100%),radial-gradient(circle at 27% 3%, rgba(48, 48, 48,0.04) 0%, rgba(48, 48, 48,0.04) 50%,rgba(163, 163, 163,0.04) 50%, rgba(163, 163, 163,0.04) 100%),linear-gradient(90deg, rgb(109,44,255),rgb(19,50,199))",
          }}
        >
          <div className="flex-1 flex flex-col pt-8 pb-1 overflow-y-auto">
            <div className="sm:pl-8 px-4 border-white border-b border-opacity-25 mb-2">
              <div className="flex items-center flex-shrink-0 flex flex-row items-center justify-between">
                <img className="w-24 md:w-29" src={logo} alt="Betterfit" />
              </div>
              <div className="flex flex-row md:flex-col items-end md:items-start justify-between">
                <SideBarDashboardTypeCTA name={orgName} />
              </div>
            </div>
            <SideBarNavigation navList={navItemsList} />
          </div>
          <SideBarProfile userName={userName} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
