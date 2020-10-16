import React from 'react'
import { ReactSVG } from 'react-svg'
import Edit from 'Images/Icons/edit.svg'
import {NavLink} from "react-router-dom";
import Button from "Components/Content/Button";

const TableBody = ({TableBody}) => {
    // console.log(`slide ${TableBody}`)
    return(
        <tbody>  
            {
                TableBody.map((row,index) =>{
                    let imageIndex;
                    if(index%2 == 0 ){
                        return(
                            <tr className="bg-white border border-white">
                                {
                                    row.map((r, index)=>{
                                        switch(r[0]) {
                                            case "priortity":
                                              // code block
                                                return(
                                                    <td className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <Button
                                                            text={r[1]} 
                                                            color={r[1] === "stat" ? "status-red" :"status-blue" } 
                                                            text_size="text-sm" 
                                                            pill={true}
                                                            extraClasses={"text-status-dark-red border-4 border-white hover:status-red"}
                                                        />
                                                    </td>
                                                )
                                            break;
                                            case "image":
                                                imageIndex = index;
                                                return(false)
                                            break;
                                            case "item":
                                                return(
                                                    <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                        <div class="flex items-center">
                                                            <img className="w-24 mr-2" src={`${row[imageIndex][1]}`} /> 
                                                            <span className="font-bold text-betterfit-basic-blue">{r[1]}</span>
                                                        </div>
                                                    </td>
                                                )
                                            break;
                                            default:
                                                return(
                                                    <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                        <div class="flex items-center">
                                                            {/* <img className="w-24 mr-2" src={`${row[imageIndex]}`} /> */}
                                                            {/* <span className="font-bold text-betterfit-basic-blue">{r}</span> */}
                                                            {r[1]}
                                                        </div>
                                                    </td>
                                                )
                                        }
                                    })      
                                }

                                
                            </tr>  
                        )
                    }else{
                        return(
                            <tr className="bg-table-row border border-table-row">
                                {
                                    row.map((r, index)=>{
                                        switch(r[0]) {
                                            case "priortity":
                                              // code block
                                                return(
                                                    <td className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <Button
                                                            text={r[1]} 
                                                            color={r[1] === "stat" ? "status-red" :"status-blue" } 
                                                            text_size="text-sm" 
                                                            pill={true}
                                                            extraClasses={"text-status-dark-red border-4 border-white hover:status-red"}
                                                        />
                                                    </td>
                                                )
                                            break;
                                            case "image":
                                                imageIndex = index;
                                                return(false)
                                            break;
                                            case "item":
                                                return(
                                                    <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                        <div class="flex items-center">
                                                            <img className="w-24 mr-2" src={`${row[imageIndex][1]}`} /> 
                                                            <span className="font-bold text-betterfit-basic-blue">{r[1]}</span>
                                                        </div>
                                                    </td>
                                                )
                                            break;
                                            default:
                                                return(
                                                    <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                        <div class="flex items-center">
                                                            {/* <img className="w-24 mr-2" src={`${row[imageIndex]}`} /> */}
                                                            {/* <span className="font-bold text-betterfit-basic-blue">{r}</span> */}
                                                            {r[1]}
                                                        </div>
                                                    </td>
                                                )
                                        }
                                    })
                                }
                            </tr>  
                        )
                    }
                })
            }

        </tbody>
    )
}
export default TableBody;