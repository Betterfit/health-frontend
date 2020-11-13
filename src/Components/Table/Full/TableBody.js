import React from 'react'
import { ReactSVG } from 'react-svg'
import Edit from 'Images/Icons/edit.svg'
import {NavLink} from "react-router-dom";
import Button from "Components/Content/Button";
import EmptyImage from "Images/emptyImage.png"
import uuid from 'react-uuid'
const TableBody = ({TableBody}) => {
    return(
        <tbody>  
            {
                TableBody.map((row,index) =>{
                    let imageIndex;
                    if(!index%2 == 0 ){
                        return(
                            <tr key={uuid()} className="bg-white border border-white">
                                {
                                    row.map((r, index)=>{
                                        switch(r[0]) {
                                            case "priority":
                                              // code block
                                                return(
                                                    <td key={uuid()} className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-betterfit-graphite">
                                                        <Button
                                                            text={r[1] === "stat" ? "Stat" : "Regular"} 
                                                            color={r[1] === "stat" ? "status-red" :"status-blue" } 
                                                            text_size="text-sm" 
                                                            pill={true}
                                                            extraClasses={ r[1] === "stat" ? "text-status-dark-red border-4 border-white hover:status-red" : "text-status-dark-blue border-4 border-white hover:status-red"  }
                                                        />
                                                    </td>
                                                )
                                            break;
                                            case "product_image":
                                                imageIndex = index;
                                                return(false)
                                            break;
                                            case "item":
                                                return(
                                                    <td key={uuid()} className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-betterfit-graphite">
                                                        <div className="flex items-center">
                                                            <img className="w-24 mr-2" role="none" src={(row[imageIndex][1] ? `${row[imageIndex][1]}` : EmptyImage)}  /> 
                                                            <span className="font-bold text-betterfit-basic-blue">{r[1]}</span>
                                                        </div>
                                                    </td>
                                                )
                                            break;
                                            default:
                                                return(
                                                    <td key={uuid()} className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-betterfit-graphite">
                                                        <div className="flex items-center">
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
                            <tr key={uuid()} className="bg-table-row border border-table-row">
                                {
                                    row.map((r, index)=>{
                                        switch(r[0]) {
                                            case "priority":
                                              // code block
                                                return(
                                                    <td key={uuid()} className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-betterfit-graphite">
                                                        <Button
                                                            text={r[1] === "stat" ? "Stat" : "Regular"} 
                                                            color={r[1] === "stat" ? "status-red" :"status-blue" } 
                                                            text_size="text-sm" 
                                                            pill={true}
                                                            extraClasses={ r[1] === "stat" ? "text-status-dark-red border-4 border-white hover:status-red" : "text-status-dark-blue border-4 border-white hover:status-red"  }
                                                        />
                                                    </td>
                                                )
                                            break;
                                            case "product_image":
                                                imageIndex = index;
                                                return(false)
                                            break;
                                            case "item":
                                                return(
                                                    <td key={uuid()} className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-betterfit-graphite">
                                                        <div className="flex items-center">
                                                            <img className="w-24 mr-2" role="none" src={(row[imageIndex][1] ? `${row[imageIndex][1]}` : EmptyImage)}  /> 
                                                            <span className="font-bold text-betterfit-basic-blue">{r[1]}</span>
                                                        </div>
                                                    </td>
                                                )
                                            break;
                                            default:
                                                return(
                                                    <td key={uuid()} className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-betterfit-graphite">
                                                        <div className="flex items-center">
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