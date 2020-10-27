import React from 'react'

const TableHead = ({TableHead}) => {
    return(
        <thead>
            <tr>
                {TableHead.map(head => {
                        return(
                            <th className="px-4 py-3 bg-white text-left text-xs leading-4 font-medium uppercase tracking-wider uppercase text-gray-400">
                                {head.replace(/[_-]/g, " ")}
                            </th>
                        )
                })}
      
            </tr>
        </thead>
    )
}
export default TableHead;