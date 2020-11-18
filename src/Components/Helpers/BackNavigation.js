import React from 'react'
import { ReactSVG } from 'react-svg'
import LeftArrow from 'Images/Icons/left-arrow.svg'
import { useHistory } from 'react-router-dom'
import Translator from "Helpers/Translator";

const BackNavigation = ({link, onClickOverride}) => {
    const history = useHistory()
    const action = (onClickOverride ? onClickOverride : () => history.goBack() )
    return(
        <a onClick={action} className="flex flex-row items-center cursor-pointer ">
            <ReactSVG src={LeftArrow} className=" text-betterfit-basic-blue"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 15px;')}}  />
            <span className="ml-2 text-betterfit-basic-blue uppercase text-xs">{Translator(link)}</span>
        </a>
    )
}
export default BackNavigation;