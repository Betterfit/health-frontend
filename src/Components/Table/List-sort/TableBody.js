import React, {FC,useState} from 'react'
import { ReactSortable } from "react-sortablejs";
import { ReactSVG } from 'react-svg'
import Edit from 'Images/Icons/edit.svg'
import {NavLink} from "react-router-dom";
import Button from "Components/Content/Button";
import StatusButton from "Components/Content/StatusButton";
const TableBody = ({TableBody,removeAtIndex,statusIndex,link,buttonType}) => {
    // console.log(`slide ${TableBody}`)
    const [rowState , setRowState ] = useState(null);
    setTimeout(()=> {
        setRowState(TableBody);
    });
    if(rowState){
            return(
         
            <ReactSortable tag="tbody" className="w-full"  list={rowState} setList={setRowState}>

            {
                TableBody.map((row,index) =>{
                    if(index%2 == 0 ){
                        return(
                            <>
                            {link && (
                                <tr className="table-row bg-white border border-white  ">
                                    {
                                        row.map((r, index)=>{
                                            if(index !== removeAtIndex)
                                                if(index == statusIndex)
                                                    return(
                                                    <td className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <NavLink className="px-4 py-4 text-sm leading-5 text-gray-500 block" to={`${link}${row[removeAtIndex]}`}>
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
                                                        
                                                        <td className="whitespace-no-wrap px-4 py-4">
                                                            <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row[removeAtIndex]}`}>
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
                                
                                <tr className="bg-table-row border m-1 border-table-row relative ">
                                    {
                                        row.map((r, index)=>{
                                            if(index !== removeAtIndex)
                                                if(index == statusIndex)
                                                    return(
                                                    <td className="px-4 py-4 whitespace-no-wrap w-8 text-sm leading-5 text-gray-500">
                                                        <NavLink className="px-4 py-4 text-sm leading-5 text-gray-500 block" to={`${link}${row[removeAtIndex]}`}>
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
                                                        <td className="whitespace-no-wrap px-4 py-4 ">
                                                            <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row[removeAtIndex]}`}>
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
            </ReactSortable>
     )
    }else{
        return(
            <div>Loading</div>
        )
    }
}
export default TableBody;