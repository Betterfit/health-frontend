import React , {useState} from 'react'
import { Transition } from '@tailwindui/react'
import { ReactSVG } from 'react-svg'
// components
import SideBarProfileNavigationMobile  from './SideBarProfileNavigationMobile';
import Profile from 'Images/Icons/profile.svg';
import DotMenu from 'Images/Icons/dot-menu.svg';

const SideBarProfileMobile = ({userName}) => {
    const [ShowNav , SetProfile ] = useState(false);
    const ToggleProfileNavigation = () => {
        SetProfile(!ShowNav);
    }
    return(
        <>
        <div className="p-0 block flex-shrink-0 flex border-gray-400 md:p-4 relative z-10 ">
            <div className="flex flex-row items-center md:hidden">
                <span className = "text-white font-sm opacity-75">{userName}</span>
                <ReactSVG onClick={ToggleProfileNavigation} src={DotMenu} className="text-white opacity-50"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 15px;height:15px')}}/>
            </div>
        </div>
        <div className="w-4/5 absolute bottom-0 right-0 px-4 py-4">
            <Transition
                    show={ShowNav}
                    enter="transition-opacity duration-75"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <SideBarProfileNavigationMobile />
            </Transition>
        </div>
      </>
    )
}

export default SideBarProfileMobile