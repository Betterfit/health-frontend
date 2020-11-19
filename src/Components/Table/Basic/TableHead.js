import React from 'react'
import Translator from "Helpers/Translator";
import uuid from 'react-uuid';
const TableHead = ({TableHead}) => {
    return(
        <thead>
            <tr>
                {TableHead.map(head => {
                        return(
                            <th key={uuid()} className="px-4 py-3 bg-white text-left text-xs leading-4 font-medium uppercase tracking-wider uppercase text-betterfit-graphite">
                              {Translator(head.replace(/[_-]/g, " "))}
                            </th>
                        )
                })}
      
            </tr>
        </thead>
    )
}
export default TableHead;