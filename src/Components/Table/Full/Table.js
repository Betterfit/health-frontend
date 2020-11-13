import React from 'react'
import TableHead from './TableHead'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
const Table = ({TableData, excludeKeys,excludeValues,}) => {
    const TableDataProducts = TableData.order_products;

    //Create the Table Data infoormation. 
    let TableHeaderData = Object.assign({}, TableData);
    delete TableHeaderData.order_products;

    let TableHeadData = [];
    let TableBodyData = [];
    let TableHeaderDataOnly = {};

    let nooptions = false;
    TableDataProducts.map(variant => {
        let keys = Object.keys(variant);
        let values = Object.entries(variant);
        keys.forEach((key,index) => {
            if(!TableHeadData.includes(key)){
               TableHeadData.push(key); 
            }
        });
        TableBodyData.push(values);
    });
    // exclude keys from filter
    TableHeadData = TableHeadData.filter(item => !excludeKeys.includes(item));
    TableBodyData = TableBodyData.map((row,index) => {
        return(
            row.filter((item,index) => {
                if( !excludeValues.includes(item[0]) ){
                    return(item);
                }
            })
        )
    });
    return(
        <div className="flex flex-col mt-10 mb-4 p-4 pt-4 bg-paragraph rounded-md">
            {TableHeaderData && (<TableHeader HeaderData = {TableHeaderData}/>)}
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="border-b border-gray-200">
                        <table className="min-w-full p-4 bg-white rounded-md">
                            <TableHead TableHead={TableHeadData} />
                            <TableBody TableBody={TableBodyData} />                            
                        </table>  
                 </div>
                </div>
            </div>
        </div>
    )
}

export default Table