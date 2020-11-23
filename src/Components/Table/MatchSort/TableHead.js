import React from 'react'
import Translator from "Helpers/Translator";

const TableHead = ({TableHead}) => {
    return(
        <thead>
            <tr>
                {TableHead.map((head,index) => {
                        if(head !== "status"){
                            return(
                                <th key={`table_head_${index}`} className="px-4 py-3  text-left leading-4 uppercase font-semibold text-10 tracking-extra-wide text-gray-600 opacity-50 ">
                                    {Translator(head.replace(/[_-]/g, " "))}
                                </th>
                            )
                        }
                })}
      
            </tr>
        </thead>
    )
}
export default TableHead;