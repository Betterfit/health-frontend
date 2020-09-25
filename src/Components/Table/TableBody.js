import React from 'react'
import { ReactSVG } from 'react-svg'
import Edit from 'Images/Icons/edit.svg'
const TableBody = ({TableBody}) => {
    let TableId = TableBody.id;
    
    return(
        <tbody>  
            {
                TableBody.map((row,index) =>{
                    if(index%2 == 0){
                        return(
                            <tr class="bg-gray-100 border-t border-gray-200">
                                {
                                    row.slice(0,-1).map(r=>{
                                        return(
                                            <td class="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                {r}
                                            </td>
                                        )
                                    })
                                }
                                <td class="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                    <a class="block" onClick={() => console.log(row[row.length - 1])}>
                                        <ReactSVG src={Edit} className=" text-gray-800"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;height:16px')}}  />
                                    </a>
                                </td>
                            </tr>
                        )
                    }else{
                        return(
                            <tr class="bg-white border-t border-gray-200">
                                {
                                    row.slice(0,-1).map(r=>{
                                        return(
                                            <td class="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                                {r}
                                            </td>
                                        )
                                    })
                                }
                                <td class="px-4 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                                    <a class="block" onClick={() => console.log(row[row.length - 1])}>
                                        <ReactSVG src={Edit} className=" text-gray-800"  beforeInjection={(svg) => { svg.setAttribute('style', 'width: 16px;height:16px')}}  />
                                    </a>
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