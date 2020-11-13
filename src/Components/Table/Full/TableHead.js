import React from 'react'
import uuid from 'react-uuid'
import Translator from "Helpers/Translator";

const TableHead = ({TableHead}) => {
    return(
        <thead>
            <tr>
                {TableHead.map((head, index) => {
                    return(
                        <th key={uuid()} className="px-4 pb-2 pt-6 text-left text-xs leading-4 font-normal uppercase tracking-wider uppercase text-gray-600">
                            {Translator(head)}
                        </th>
                    )                 
                })}
      
            </tr>
        </thead>
    )
}
export default TableHead;