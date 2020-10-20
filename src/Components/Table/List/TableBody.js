import React from 'react'
import { ReactSVG } from 'react-svg'
import Edit from 'Images/Icons/edit.svg'
import {NavLink} from "react-router-dom";
import Button from "Components/Content/Button";

const TableBody = ({TableBody,removeAtIndex,statusIndex,link}) => {
    // console.log(`slide ${TableBody}`)
    return(
        <tbody>  
            {
                TableBody.map((row,index) =>{
                    if(index%2 == 0 ){
                        return(
                            <>
                            {link && (
                                <tr className="table-row bg-white border border-white  hover:border-betterfit-highlight-blue">
                                    {
                                        row.map((r, index)=>{
                                            if(index !== removeAtIndex)
                                                if(index == statusIndex)
                                                    return(
                                                    <td className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <NavLink className="px-4 py-4 text-sm leading-5 text-gray-500" to={`${link}${row[removeAtIndex]}`}>
                                                            <Button 
                                                                text={r} 
                                                                color={r === "shipped"  ? "status-dark-green" :"betterfit-basic-blue" } 
                                                                text_size="text-sm" 
                                                            />
                                                        </NavLink>
                                                        
                                                    </td>)
                                                else
                                                    return(
                                                        
                                                        <td className="whitespace-no-wrap">
                                                            <NavLink className="px-4 py-4 text-sm leading-5 text-gray-500" to={`${link}${row[removeAtIndex]}`}>
                                                                {r}
                                                            </NavLink>
                                                        </td>
                                                
                                                    )
                                        })
                                    }
                                </tr>

                            )}
                            {!link && (
                                <tr className="bg-white border border-white">
                                    {
                                        row.map((r, index)=>{
                                            if(index !== removeAtIndex)
                                                if(index == statusIndex)
                                                    return(
                                                    <td className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <NavLink className="px-4 py-4 text-sm leading-5 text-gray-500" to={`${link}${row[removeAtIndex]}`}>
                                                            <Button 
                                                                text={r} 
                                                                color={r === "shipped" ? "status-dark-green" : "betterfit-basic-blue" } 
                                                                text_size="text-sm" 
                                                            />
                                                        </NavLink>
                                                        
                                                    </td>)
                                                else
                                                    return(
                                                        <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                            {r}
                                                        </td>
                                                    )
                                        })
                                    }
                                </tr>  
                            )}
                            </>
                        )
                    }else{
                        return(
                            <>
                            {link && (
                                
                                <tr className="bg-table-row border m-1 border-table-row relative hover:border-betterfit-highlight-blue">
                                    {
                                        row.map((r, index)=>{
                                            if(index !== removeAtIndex)
                                                if(index == statusIndex)
                                                    return(
                                                    <td className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <Button 
                                                            text={r} 
                                                            color={r === "shipped" ? "status-dark-green" :"betterfit-basic-blue" } 
                                                            text_size="text-sm" 
                                                        />
                                                        
                                                    </td>)
                                                else
                                                    return(
                                                        <td className="whitespace-no-wrap">
                                                            <NavLink className="px-4 py-4 text-sm leading-5 text-gray-500" to={`${link}${row[removeAtIndex]}`}>
                                                                    {r}
                                                            </NavLink>
                                                        </td>
                                                    )
                                        })
                                    }
                                </tr>
                                
                            )}
                            {!link && (
                                <tr className="bg-table-row border border-table-row">
                                    {
                                        row.map((r, index)=>{
                                            if(index !== removeAtIndex)
                                                if(index == statusIndex)
                                                    return(
                                                    <td className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <Button 
                                                            text={r} 
                                                            color={r === "shipped"  ? "status-dark-green" :"betterfit-basic-blue" } 
                                                            text_size="text-sm" 
                                                        />
                                                        
                                                    </td>)
                                                else
                                                    return(
                                                        <td className="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                            {r}
                                                        </td>
                                                    )
                                        })
                                    }
                                </tr>  
                            )}
                            </>
                        )
                    }
                })
            }

        </tbody>
    )
}
export default TableBody;