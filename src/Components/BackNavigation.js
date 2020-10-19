import React from 'react'
import { ReactSVG } from 'react-svg'
import LeftArrow from 'Images/Icons/left-arrow.svg'
import { useHistory } from 'react-router-dom'
const BackNavigation = ({link}) => {
    const history = useHistory()
    return(
        <a onClick={() => history.goBack()} className="flex flex-row items-center pt-8">
            <ReactSVG src={LeftArrow} className=" text-gray-800"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 8px;')}}  />
            <span className="text-light-text ml-4">{link}</span>
        </a>
    )
}
export default BackNavigation;