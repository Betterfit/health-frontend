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
        <div class="p-0 block flex-shrink-0 flex border-gray-400 md:p-4 relative z-10">
            <div class="flex flex-row items-center md:hidden">
                <ReactSVG src={Profile} className="text-gray-600"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 30px;')}}  />
                <ReactSVG onClick={ToggleProfileNavigation} src={DotMenu} className="text-gray-600"/>
            </div>
        </div>
        <div class="w-4/5 absolute bottom-0 right-0 px-4 py-4">
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