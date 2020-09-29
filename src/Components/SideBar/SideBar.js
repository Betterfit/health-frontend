import React,{useState} from 'react';
import SideBarNavigation from './SideBarNavigation';
import SideBarDashboardTypeCTA from './SideBarDashboardTypeCTA';
import SideBarProfile from './SideBarProfile';
import logo from 'Images/logo.png'


const SideBarDashBoard = () => {
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
        // <!-- Static sidebar for desktop -->
        <div class="md:flex md:flex-shrink-0">
          <div class="flex flex-col md:w-64">

            <div class="flex flex-col md:h-0 flex-1 border-r border-gray-400 bg-white">
              <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto px-4">
                <div class="flex items-center flex-shrink-0">
                  <img class="w-48 md:w-3/4" src={logo} alt="Workflow"/>
                </div>
                <SideBarDashboardTypeCTA name="Supplier Name" location="Edmonton,AB" />
                <SideBarNavigation navList={navItemsList} />
              </div>
              {/* TODO - DYNAMIC NAME ONCE API IS HOOKED UP */}
              <SideBarProfile userName="My Name" />
            </div>
          </div>
        </div>
        
    )
}

export default SideBarDashBoard