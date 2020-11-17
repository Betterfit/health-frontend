import React, { useState } from 'react'
import { ReactSortable } from "react-sortablejs";
import { ReactSVG } from 'react-svg';
import Moveable from 'Images/Icons/moveable.svg';
import Attention from 'Images/Icons/yellow-attention.svg';
import {NavLink} from "react-router-dom";
import dayjs from 'dayjs';
import Api from "Helpers/api";
import Translator from "Helpers/Translator";
const TableBody = ({TableBodyData,updateRow,removeAtIndex,statusIndex,link,buttonType}) => {
    const api = new Api();
    const [rowState , setRowState ] = useState(TableBodyData);
    const sortFunction = () => {
        // let arr = rowState;
        // arr = arr.map((item,index) => {
        //     console.log(item);
        //     let obj = {
        //         pk:item.id,
        //         order:index,
        //     }
        //     return obj;
        // });
        // console.log(arr);
        // api.postSortedMatches(arr)
        // .then((response) => {
        //     console.log(response.data);
        // })
        updateRow(rowState)
    } 
    return(
        <>
        {rowState && (
            <ReactSortable tag="tbody" className="w-full"  list={rowState} setList={setRowState} onSort={() => {
                sortFunction();  
            }} >

            {
                rowState.map((row,pindex) =>{
                    let orderDate = Date.parse(row.order_date);
                    orderDate = dayjs(orderDate).format('D');
                    let today = new Date();
                    today = dayjs(today).format('D')
                    if(pindex%2 == 0 ){
                        return(
                            <tr key={`table_row_${pindex}`} className="table-row bg-white border border-white table-row ">
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <span className="flex items-center">
                                        <ReactSVG src={Moveable} className="flex items-center"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />
                                        <NavLink className="text-sm leading-5 text-betterfit-graphite ml-3" to={`${link}${row.id}`}>
                                             {row.order_no}
                                        </NavLink>
                                    </span>
                                </td>
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-betterfit-graphite" to={`${link}${row.id}`}>
                                        {row.province}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-betterfit-graphite" to={`${link}${row.id}`}>
                                        {row.facility}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-betterfit-graphite" to={`${link}${row.id}`}>
                                        {!row.supplier && (
                                            <span className="flex items-center">
                                                <ReactSVG src={Attention} className="flex items-center"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />
                                                <span style={{color:'#B36200'}} className="font-bold pl-1">{Translator("No Match")}</span>
                                            </span>
                                        )}
                                        {row.supplier && ( 
                                            <>
                                            {row.supplier}
                                            </>
                                        )}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-betterfit-graphite" to={`${link}${row.id}`}>
                                        {today - orderDate >= 2 && (
                                            <span className="flex items-center">
                                                <ReactSVG src={Attention} className="flex items-center"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />
                                                <span style={{color:'#B36200'}} className="font-bold pl-1">{row.order_date}</span>
                                            </span>
                                        )}
                                        {today - orderDate < 2 && (
                                            <>
                                                {row.order_date}
                                            </>
                                        )}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-betterfit-graphite" to={`${link}${row.id}`}>
                                        {row.rank}
                                    </NavLink>
                                </td>    
                            </tr>
                        )
                    }else{
                        return(
                            <tr key={`table_row_${pindex}`} className="bg-table-row border m-1 border-table-row relative table-row">    
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <span className="flex items-center">
                                        <ReactSVG src={Moveable} className="flex items-center"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />
                                        <NavLink className="text-sm leading-5 text-betterfit-graphite ml-3" to={`${link}${row.id}`}>
                                            {row.order_no}
                                        </NavLink>
                                    </span>
                                </td>
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-betterfit-graphite" to={`${link}${row.id}`}>
                                        {row.province}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-betterfit-graphite" to={`${link}${row.id}`}>
                                        {row.facility}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-betterfit-graphite" to={`${link}${row.id}`}>
                                        {!row.supplier && (
                                            <span className="flex items-center">
                                                <ReactSVG src={Attention} className="flex items-center"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />
                                                <span style={{color:'#B36200'}} className="font-bold pl-1">No Match!</span>
                                            </span>
                                        )}
                                        {row.supplier && ( 
                                            <>
                                            {row.supplier}
                                            </>
                                        )}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-betterfit-graphite" to={`${link}${row.id}`}>
                                        {today - orderDate >= 2 && (
                                            <span className="flex items-center">
                                                <ReactSVG src={Attention} className="flex items-center"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;')}}  />
                                                <span style={{color:'#B36200'}} className="font-bold pl-1">{row.order_date}</span>
                                            </span>
                                        )}
                                        {today - orderDate < 2 && (
                                            <>
                                                {row.order_date}
                                            </>
                                        )}
                                    </NavLink>
                                </td> 
                                <td className="whitespace-no-wrap px-4 py-4">
                                    <NavLink className="text-sm leading-5 text-betterfit-graphite" to={`${link}${row.id}`}>
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