import React,{useState} from 'react';
import SideBarNavigation from './SideBarNavigation';
import SideBarDashboardTypeCTA from './SideBarDashboardTypeCTA';
import SideBarProfile from './SideBarProfile';
import SideBarProfileMobile from './SideBarProfileMobile';
import logo from 'Images/logo.png'



const SideBar = () => {
  const [active , setActive] = useState(false)
  const activateMenu = ()=>{
    setActive(!active);
  }

    const navItemsList = [
        {
            to:'/dashboard/orders',
            name:'Orders'
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
        <div class="md:flex md:flex-shrink-0">
          <div class="flex flex-col md:w-64">
            <div class="flex flex-col md:h-0 flex-1 border-r border-gray-400 bg-white relative">
              <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto px-4">
                <div class="flex items-center flex-shrink-0">
                  <img class="w-48 md:w-3/4" src={logo} alt="Workflow"/>
                </div>
                <div class="flex flex-row md:flex-col items-end justify-between ">
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