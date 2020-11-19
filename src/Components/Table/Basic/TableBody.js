import React from 'react'
import { ReactSVG } from 'react-svg'
import Edit from 'Images/Icons/edit.svg'
import {NavLink} from "react-router-dom";
import uuid from 'react-uuid'
const TableBody = ({TableBody,variantID,NoOptions}) => {
    let setIndex;
    return(
        <tbody>  
            {
                TableBody.map((row,index) =>{
                    if(index%2 == 0 ){
                        return(
                            <tr  key={uuid()} className="bg-gray-100 border-t border-gray-200">
                                {
                                    row.map((r, index)=>{
                                        if(r[0] !== "pk" ){
                                            return(
                                                <td  key={uuid()} className="px-4 py-4 text-sm leading-5 text-betterfit-graphite">
                                                    {r[1]}
                                                </td>
                                            )  
                                        }else{
                                            setIndex = r[1];
                                        }
                                        
                                    })
                                }
                                <td  key={uuid()} className="px-4 py-4 w-8 text-sm leading-5 text-betterfit-graphite">
                                    <NavLink to={`${variantID}/detail/${ NoOptions ? 'edit' : setIndex+'/edit'}`} >
                                        <ReactSVG src={Edit} className=" text-gray-500"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;height:16px')}}  />
                                    </NavLink>
                                </td>
                            </tr>
                        )
                    }else{
                        return(
                            <tr  key={uuid()} className="bg-white border-t border-gray-200">
                                {
                                    row.map((r,index)=>{
                                        
                                        if(r[0] !== "pk" ){
                                            return(
                                                <td  key={uuid()} className="px-4 py-4 text-sm leading-5 text-betterfit-graphite">
                                                    {r[1]}
                                                </td>
                                            )  
                                        }
                                        else{
                                            setIndex = r[1];
                                        }
                                        
                                    })
                                }
                                <td  key={uuid()} className="px-4 py-4 text-sm leading-5 text-betterfit-graphite">
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