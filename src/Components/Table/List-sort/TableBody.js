import React, {FC,useState,useEffect} from 'react'
import { ReactSortable } from "react-sortablejs";
import { ReactSVG } from 'react-svg'
import Edit from 'Images/Icons/edit.svg'
import Moveable from 'Images/Icons/moveable.svg'
import {NavLink} from "react-router-dom";
import Button from "Components/Content/Button";
import StatusButton from "Components/Content/StatusButton";
const TableBody = ({TableBodyData,removeAtIndex,statusIndex,link,buttonType}) => {
    const [rowState , setRowState ] = useState(TableBodyData);
    console.log(rowState);
    return(
        <>
        {rowState && (
            <ReactSortable tag="tbody" className="w-full"  list={rowState} setList={setRowState}>

            {
                rowState.map((row,index) =>{
                    if(index%2 == 0 ){
                        return(
                            <tr className="table-row bg-white border border-white  ">
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <span className="flex items-center">
                                        <ReactSVG src={Moveable} className="flex items-center"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />
                                        <NavLink className="text-sm leading-5 text-gray-500 ml-3" to={`${link}${row.id}`}>
                                            {row.match_number}
                                        </NavLink>
                                    </span>
                                </td>
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row.id}`}>
                                        {row.province}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row.id}`}>
                                        {row.facility}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row.id}`}>
                                        {row.supplier}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row.id}`}>
                                        {row.order_date}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row.id}`}>
                                        {row.rank}
                                    </NavLink>
                                </td>    
                            </tr>
                        )
                    }else{
                        return(
                            <tr className="bg-table-row border m-1 border-table-row relative ">    
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <span className="flex items-center">
                                        <ReactSVG src={Moveable} className="flex items-center"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />
                                        <NavLink className="text-sm leading-5 text-gray-500 ml-3" to={`${link}${row.id}`}>
                                            {row.match_number}
                                        </NavLink>
                                    </span>
                                </td>
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row.id}`}>
                                        {row.province}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row.id}`}>
                                        {row.facility}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row.id}`}>
                                        {row.supplier}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row.id}`}>
                                        {row.order_date}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-gray-500" to={`${link}${row.id}`}>
                                        {row.rank}
                                    </NavLink>
                                </td> 
                            </tr>
                        )
                    }
                })
            }
            </ReactSortable>
        )}
        </>
     )
}
export default TableBody;