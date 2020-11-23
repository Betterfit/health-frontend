import React from 'react'
import { ReactSVG } from 'react-svg'
import Edit from 'Images/Icons/edit.svg'
import {NavLink} from "react-router-dom";
import Button from "Components/Content/Button";
import StatusButton from "Components/Content/StatusButton";
import dayjs from 'dayjs';
const TableBody = ({TableBody,removeAtIndex,statusIndex,link,buttonType}) => {
    // console.log(`slide ${TableBody}`)
    return(
        <tbody>  
            {
                TableBody.map((row,pindex) =>{
                    if(pindex%2 == 0 ){
                        return(
                            <React.Fragment key={`table_row_${pindex}`} >
                            {link && (
                                <tr className="table-row bg-white border border-white  hover:border-betterfit-highlight-blue">
                                    {
                                        row.map((r, index)=>{
                                                    
                                            if(index !== removeAtIndex)
                                                if(index == statusIndex)
                                                    return(
                                                    <td key={`table_td_${pindex}_${index}`} className="px-4 py-4 whitespace-no-wrap w-8 leading-5 text-gray-500">
                                                        <NavLink className="px-4 py-4 leading-5 text-gray-500 block" to={`${dayjs().format('YYYY-M-D') === row[0] ? '/dashboard/matches/' : `/dashboard/matches/history?date=${row[0]}`}`}>
                                                            {buttonType === "statusbutton" && (
                                                                <StatusButton status={r} />
                                                            )} 
                                                            {buttonType !== "statusbutton" && (
                                                                <Button 
                                                                    text={r} 
                                                                    color={r === "shipped"  ? "status-dark-green" :"betterfit-basic-blue" } 
                                                                    text_size="text-sm" 
                                                                />
                                                            )} 
                                                        </NavLink>
                                                        
                                                    </td>)
                                                else
                                                    return(
                            
                                                        <td key={`table_td_${pindex}_${index}`} className={`whitespace-no-wrap px-4 py-4 ${index == 1 ? 'lg:w-40 text-betterfit-grey-blue text-right pr-10' : 'text-betterfit-graphite font-bold'}`}>
                                                            <NavLink className="text-base leading-5" to={`${dayjs().format('MMMM D , YYYY') === row[0] ? '/dashboard/matches/' : `/dashboard/matches/history?date=${row[0]}`}`}>
                                                                {r}
                                                            </NavLink>
                                                        </td>
                                                
                                                    )
                                        })
                                    }
                                </tr>

                            )}
                            </React.Fragment>
                        )
                    }else{
                        return(
                            <React.Fragment key={`table_row_${pindex}`}>
                            {link && (
                                
                                <tr className="table-row bg-table-row border m-1 border-table-row relative hover:border-betterfit-highlight-blue">
                                    {
                                        row.map((r, index)=>{
                                            if(index !== removeAtIndex)
                                                if(index == statusIndex)
                                                    return(
                                                    <td key={`table_td_${pindex}_${index}`} className="px-4 py-4 whitespace-no-wrap w-8 text-base leading-5 text-gray-500">
                                                        <NavLink className="px-4 py-4 text-base leading-5 text-gray-500 block" to={`${dayjs().format('MMMM D , YYYY') === row[0] ? '/dashboard/matches/' : `/dashboard/matches/history?date=${row[0]}`}`}>
                                                            {buttonType === "statusbutton" && (
                                                                <StatusButton status={r} />
                                                            )} 
                                                            {buttonType !== "statusbutton" && (
                                                                <Button 
                                                                    text={r} 
                                                                    color={r === "shipped"  ? "status-dark-green" :"betterfit-basic-blue" } 
                                                                    text_size="text-sm" 
                                                                />
                                                            )} 
                                                        </NavLink>
                                                        
                                                    </td>)
                                                else
                                                    return(
                                                        <td key={`table_td_${pindex}_${index}`} className={`whitespace-no-wrap px-4 py-4${index == 1 ? 'lg:w-40 text-betterfit-grey-blue text-right pr-10' : 'text-betterfit-graphite font-bold'}`}>
                                                            <NavLink className="text-base leading-5 text-gray-500" to={`${dayjs().format('YYYY-M-D') === row[0] ? '/dashboard/matches/' : `/dashboard/matches/history?date=${row[0]}`}`}>
                                                                    {r}
                                                            </NavLink>
                                                        </td>
                                                    )
                                        })
                                    }
                                </tr>
                                
                            )}
                            </React.Fragment>
                        )
                    }
                })
            }

        </tbody>
    )
}
export default TableBody;