import React from 'react'

const TableHead = ({TableHead}) => {
    return(
        <thead>
            <tr>
                {TableHead.map(head => {
                    return(
                        <th className="px-4 py-3  text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider uppercase text-gray-700 font-extrabold ">
                            {head.replace(/[_-]/g, " ")}
                        </th>
                    )                 
                })}
      
            </tr>
        </thead>
    )
}
export default TableHead;