import React from 'react'
import { ReactSVG } from 'react-svg'
import Edit from 'Images/Icons/edit.svg'
import {NavLink} from "react-router-dom";
import StatusButton from "Components/Content/StatusButton";
import EmptyImage from "Images/emptyImage.png";
const TableBody = ({TableBody}) => {
    return(
        <tbody>  
            {
                TableBody.map((row,index) =>{
                    let imageIndex;
                    if(index%2 == 0 ){
                        return(
                            <tr key={index} className="bg-table-row border border-table-row">
                                {
                                    row.map((r, index)=>{
                                        switch(r[0]) {
                                            case "priority":
                                              // code block
                                                return(
                                                    <td key={index} className="px-4 py-4  w-8 text-sm leading-5 text-gray-500">
                                                        <StatusButton
                                                            status={r[1] === "stat" ?  "stat" : "regular"} 
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
                                                    <td key={index} className="px-4 py-4 whitespace-no-wrap text-base leading-5 text-betterfit-graphite">
                                                        <div className="flex items-center" style={{width:"max-content"}}>
                                                            <img className="w-24 mr-2" role="none" src={`${row[imageIndex][1] ? row[imageIndex][1] : EmptyImage}`} /> 
                                                            <span className="font-semibold text-betterfit-graphite ml-2 width-control-table">{r[1]}</span>
                                                        </div>
                                                    </td>
                                                )
                                            break;
                                            default:
                                                return(
                                                    <td key={index} className="px-4 py-4  text-base leading-5 text-betterfit-grey-blue">
                                                        <div className="flex items-center">
                                                            {/* <img className="w-24 mr-2" src={`${row[imageIndex]}`} /> */}
                                                            {/* <span className="font-bold text-betterfit-graphite">{r}</span> */}
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
                            <tr key={index} className="bg-white border border-white">
                                {
                                    row.map((r, index)=>{
                                        switch(r[0]) {
                                            case "priority":
                                              // code block
                                                return(
                                                    <td key={index} className="px-4 py-4  w-8 text-sm leading-5 text-gray-500">
                                                        <StatusButton
                                                            status={r[1] === "stat" ?  "stat" : "regular"} 
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
                                                    <td key={index} className="px-4 py-4 whitespace-no-wrap  text-base leading-5 text-betterfit-graphite">
                                                        <div className="flex items-center" style={{width:"max-content"}}>
                                                            <img className="w-24 mr-2"role="none" src={`${row[imageIndex][1] ? row[imageIndex][1] : EmptyImage}`} /> 
                                                            <span className="font-semibold text-betterfit-graphite ml-2 width-control-table">{r[1]}</span>
                                                        </div>
                                                    </td>
                                                )
                                            break;
                                            default:
                                                return(
                                                    <td key={index} className="px-4 py-4  text-base leading-5 text-betterfit-grey-blue">
                                                        <div className="flex items-center">
                                                            {/* <img className="w-24 mr-2" src={`${row[imageIndex]}`} /> */}
                                                            {/* <span className="font-bold text-betterfit-graphite">{r}</span> */}
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