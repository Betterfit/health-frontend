import React,{useState} from 'react';
import SideBarNavigation from './SideBarNavigation';
import SideBarDashboardTypeCTA from './SideBarDashboardTypeCTA';
import SideBarProfile from './SideBarProfile';
import SideBarProfileMobile from './SideBarProfileMobile';
import logo from 'Images/Icons/logo-full.svg';



const SideBar = () => {
  const [active , setActive] = useState(false)
  const activateMenu = ()=>{
    setActive(!active);
  }

    const navItemsList = [
        {
            to:'/dashboard/orders',
            name:'Tickets'
        },
        {
            to:'/dashboard/inventory',
            name:'Inventory'
        },
        {
          to:'/dashboard/Resources',
          name:'Resources'
      }
    ]
    return(
        <div className="md:flex md:flex-shrink-0">
          <div className="flex flex-col sidebar md:p-4 md:pr-0">
            <div className="flex flex-col md:h-0 flex-1 bg-blue relative md:rounded-lg">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto px-4">
                <div className="flex items-center flex-shrink-0">
                  <img className="w-48 md:w-56" src={logo} alt="Workflow"/>
                </div>
                <div className="flex flex-row md:flex-col items-end md:items-start justify-between ">
                  <SideBarDashboardTypeCTA name="Supplier Name" location="Edmonton,AB" />
                  <SideBarProfileMobile />
                </div>
                 
                <SideBarNavigation navList={navItemsList} /> 
              </div>
              <SideBarProfile active={active} userName="My Name" />
            </div>
          </div>
        </div>   
    )
}

export default SideBar