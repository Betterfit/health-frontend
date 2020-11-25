import React from 'react'
import Translator from "Helpers/Translator";

const TableHead = ({TableHead}) => {
    return(
        <thead>
            <tr>
                {TableHead.map((head,index) => {
                        
                            if(head == "orders"){
                                return(
                                    <th key={`table_head_${index}`} className="px-4 py-3  text-left text-10 leading-4 font-semibold tracking-extra-wide uppercase text-gray-600  text-right pr-10  opacity-50">
                                        {Translator(head.replace(/[_-]/g, " "))}
                                    </th>
                                )
                            }else{
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