import React , {useState} from 'react'
// import { Transition } from '@tailwindui/react'
// components
import SideBarProfileNavigation  from './SideBarProfileNavigation';



const SideBarProfile = ({userName}) => {

    const [ShowNav , SetProfile ] = useState(false)
    const ToggleProfileNavigation = () => {
        SetProfile(!ShowNav);
    }

    return(
        <div class="hidden md:block flex-shrink-0 flex border-t border-gray-400 p-4 relative z-10" onMouseOver={ToggleProfileNavigation} onMouseOut={ToggleProfileNavigation}>
            <Transition
                show={ShowNav}
                enter="transition-opacity duration-75"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <SideBarProfileNavigation />
            </Transition>
            <a href="#" class="flex-shrink-0 w-full group block profile-container">
                <div class="flex items-center">
                    <div class="ml-3">
                        <p class="text-sm leading-5 font-medium text-gray-700 group-hover:text-gray-900">
                            {userName}
                        </p>
                        <p class="text-xs leading-4 font-medium text-gray-500 group-hover:text-gray-700 transition ease-in-out duration-150">
                            View profile
                        </p>
                    </div>
                </div>
            </a>
      </div>
    )
}

export default SideBarProfile