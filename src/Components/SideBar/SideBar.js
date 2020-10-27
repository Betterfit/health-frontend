import React,{useState} from 'react';
import SideBarNavigation from './SideBarNavigation';
import SideBarDashboardTypeCTA from './SideBarDashboardTypeCTA';
import SideBarProfile from './SideBarProfile';
import logo from 'Images/Icons/logo-full.svg';
import useStores from 'Helpers/useStores';



const UserInfo = (profile) => {
  switch (profile.user_type){
    case "facility_admin":
      return profile.facility_name;
    case 'supplier_admin':
      return profile.supplier_name;
  }
}


const SideBar = ({navItemsList}) => {
  const { store } = useStores();
  const [userData , setUserType] = useState(JSON.parse(localStorage.getItem('user')));
  const userName = userData.username;
  const orgName = UserInfo(userData.user_profile)
  const userType = userData.user_profile.user_type;
  const [active , setActive] = useState(false)
  const activateMenu = ()=>{
    setActive(!active);
  }
    return(
        <div className="md:flex md:flex-shrink-0">
          <div className="flex flex-col sidebar md:p-4 md:pr-0">
            <div className="flex flex-col md:h-0 flex-1 bg-blue relative md:rounded-lg">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto px-4">
                <div className="flex items-center flex-shrink-0 flex flex-row items-center justify-between">
                  <img className="w-30 md:w-56" src={logo} alt="Workflow"/>
                </div>
                <div className="flex flex-row md:flex-col items-end md:items-start justify-between ">
                  <SideBarDashboardTypeCTA name={orgName} location="Edmonton,AB" />
                </div>
                <SideBarNavigation navList={navItemsList} /> 
              </div>
              <SideBarProfile active={active} userName={userName} userType={userType} />
            </div>
          </div>
        </div>   
    )
}

export default SideBar