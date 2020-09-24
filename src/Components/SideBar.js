import React,{useState} from 'react';


import SideBarNavigation from './SideBarNavigation';
import logo from 'Images/logo.png'

const navItemsList = [
    {
        to:'/dashboard/orders',
        name:'Orders'
    },
    {
        to:'/dashboard/inventory',
        name:'Inventory'
    }
]

const SideBar = () => {
    return(
        // <!-- Static sidebar for desktop -->
        <div class="hidden md:flex md:flex-shrink-0">
          <div class="flex flex-col w-64 px-4">
            {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
            <div class="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
              <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div class="flex items-center flex-shrink-0">
                  <img class="w-3/4" src={logo} alt="Workflow"/>
                </div>
                <div class="mt-6 mb-2">
                    {/* TODO dynamic component and name */}
                    <span class="font-bold text-lg">   Supplier Name </span>
                    <p class="text-sm">Edmonton,AB</p>
                </div>
                <SideBarNavigation navList={navItemsList} />
              </div>
              <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
                <a href="#" class="flex-shrink-0 w-full group block">
                  <div class="flex items-center">
                    <div class="ml-3">
                      <p class="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">
                        Tom Cook
                      </p>
                      <p class="text-xs leading-4 font-medium text-gray-500 group-hover:text-gray-700 transition ease-in-out duration-150">
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        
    )
}

export default SideBar