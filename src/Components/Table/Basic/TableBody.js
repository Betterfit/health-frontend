import React from 'react'
import { ReactSVG } from 'react-svg'
import Edit from 'Images/Icons/edit.svg'
import {NavLink} from "react-router-dom";
const TableBody = ({TableBody,variantID,NoOptions}) => {
    console.log(`search - ${TableBody}`)
    let setIndex;
    return(
        <tbody>  
            {
                TableBody.map((row,index) =>{
                    if(index%2 == 0 ){
                        return(
                            <tr className="bg-gray-100 border-t border-gray-200">
                                {
                                    row.map((r, index)=>{
                                        if(r[0] !== "pk" ){
                                            return(
                                                <td className="px-4 py-4 text-sm leading-5 text-gray-500">
                                                    {r[1]}
                                                </td>
                                            )  
                                        }else{
                                            setIndex = r[1];
                                        }
                                        
                                    })
                                }
                                <td className="px-4 py-4 w-8 text-sm leading-5 text-gray-500">
                                    <NavLink to={`${variantID}/detail/${ NoOptions ? 'edit' : setIndex+'/edit'}`} >
                                        <ReactSVG src={Edit} className=" text-gray-500"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;height:16px')}}  />
                                    </NavLink>
                                </td>
                            </tr>
                        )
                    }else{
                        return(
                            <tr className="bg-white border-t border-gray-200">
                                {
                                    row.map((r,index)=>{
                                        
                                        if(r[0] !== "pk" ){
                                            return(
                                                <td className="px-4 py-4 text-sm leading-5 text-gray-500">
                                                    {r[1]}
                                                </td>
                                            )  
                                        }
                                        else{
                                            setIndex = r[1];
                                        }
                                        
                                    })
                                }
                                <td className="px-4 py-4 text-sm leading-5 text-gray-500">
                                    <NavLink to={`${variantID}/detail/${ NoOptions ? 'edit' : setIndex+'/edit'}`} >
                                        <ReactSVG src={Edit} className=" text-gray-500"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;height:16px')}}  />
                                    </NavLink>
                                </td>
                            </tr>
                        )
                    }
                })
            }

        </tbody>
    )
}
export default TableBody;