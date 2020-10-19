import React from 'react'
import { ReactSVG } from 'react-svg'
import LeftArrow from 'Images/Icons/left-arrow.svg'
import { useHistory } from 'react-router-dom'
const BackNavigation = ({link}) => {
    const history = useHistory()
    return(
        <a onClick={() => history.goBack()} className="flex flex-row items-center pt-8">
            <ReactSVG src={LeftArrow} className=" text-betterfit-basic-blue"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 15px;')}}  />
            <span className="ml-2 text-betterfit-basic-blue uppercase text-xs">{link}</span>
        </a>
    )
}
export default BackNavigation;