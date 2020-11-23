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
                                                    <td key={`table_td_${pindex}_${index}`} className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <NavLink className="px-4 py-4 text-sm leading-5 text-gray-500 block" to={`${dayjs().format('YYYY-M-D') === row[0] ? '/dashboard/matches/' : `/dashboard/matches/history?date=${row[0]}`}`}>
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
                                                        
                                                        <td key={`table_td_${pindex}_${index}`} className="whitespace-no-wrap px-4 py-4">
                                                            <NavLink className="text-sm leading-5 text-gray-500" to={`${dayjs().format('YYYY-M-D') === row[0] ? '/dashboard/matches/' : `/dashboard/matches/history?date=${row[0]}`}`}>
                                                                {r}
                                                            </NavLink>
                                                        </td>
                                                
                                                    )
                                        })
                                    }
                                </tr>

                            )}
                            {!link && (
                                <tr className="bg-white border border-white table-row">
                                    {
                                        row.map((r, index)=>{
                                            if(index !== removeAtIndex)
                                                if(index == statusIndex)
                                                    return(
                                                    <td key={`table_td_${pindex}_${index}`} className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <span className="px-4 py-4 text-sm leading-5 text-gray-500">
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
                                                        </span>
                                                        
                                                    </td>)
                                                else
                                                    return(
                                                        <td key={`table_td_${pindex}_${index}`} className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                            {r}
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
                                                    <td key={`table_td_${pindex}_${index}`} className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <NavLink className="px-4 py-4 text-sm leading-5 text-gray-500 block" to={`${dayjs().format('YYYY-M-D') === row[0] ? '/dashboard/matches/' : `/dashboard/matches/history?date=${row[0]}`}`}>
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
                                                        <td key={`table_td_${pindex}_${index}`} className="whitespace-no-wrap px-4 py-4 ">
                                                            <NavLink className="text-sm leading-5 text-gray-500" to={`${dayjs().format('YYYY-M-D') === row[0] ? '/dashboard/matches/' : `/dashboard/matches/history?date=${row[0]}`}`}>
                                                                    {r}
                                                            </NavLink>
                                                        </td>
                                                    )
                                        })
                                    }
                                </tr>
                                
                            )}
                            {!link && (
                                <tr className="bg-table-row border border-table-row table-row">
                                    {
                                        row.map((r, index)=>{
                                            if(index !== removeAtIndex)
                                                if(index == statusIndex)
                                                    return(
                                                    <td key={`table_td_${pindex}_${index}`} className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <span className="px-4 py-4 text-sm leading-5 text-gray-500">
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
                                                        </span>
                                                    </td>)
                                                else
                                                    return(
                                                        <td key={`table_td_${pindex}_${index}`} className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                            {r}
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