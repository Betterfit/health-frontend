import React , {useState} from 'react'
import { Transition } from '@tailwindui/react'
import { ReactSVG } from 'react-svg'
// components
import SideBarProfileNavigation  from './SideBarProfileNavigation';
import Profile from 'Images/Icons/profile.svg';
import DotMenu from 'Images/Icons/dot-menu.svg';
import ProfileCard from "Components/Profile/ProfileCard";
const SideBarProfile = ({userName,active}) => {
    const [ShowNav , SetProfile ] = useState(active);
    const ToggleProfileNavigation = () => {
        SetProfile(!ShowNav);
    }
    return(
        <>
        <div style={{borderColor:'rgba(255,255,255,0.2)'}} className="p-0 block flex-shrink-0 flex border-t md:p-4 relative z-10" onMouseOver={ToggleProfileNavigation} onMouseOut={ToggleProfileNavigation}>
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
            <a href="#" className="flex-shrink-0 w-full group block profile-container hidden md:block">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-md leading-5 font-medium text-white opacity-75 group-hover:text-gray-900">
                            {userName}
                        </p>
                    </div>
                </div>
            </a>
      </div>
      </>
    )
}

export default SideBarProfile