import React from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody'
const Table = ({TableData}) => {

    const TableHeadData = [];
    const TableBodyData = [];
    let nooptions = false;
    let removeAtIndex;
    if(TableData.product_options && TableData.product_options.length){
        TableData.product_options.map(variant => {
            let keys = Object.keys(variant);
            let values = Object.values(variant);
            keys.forEach((key,index) => {
                if(!TableHeadData.includes(key)){
                    if(key !== "pk"){
                        // console.log(`key ${variant[key]}`);
                        TableHeadData.push(key);
                    }else{
                        removeAtIndex = index;
                    }
                }
            });
            TableBodyData.push(values);
        });
    }else{
        nooptions = true;
        let keys = Object.keys(TableData);
        let values = Object.values(TableData);
        keys.forEach((key,index) => {
            if(!TableHeadData.includes(key)){
                if(key !== "pk" && key !=="product_options" &&  key !=="product_variations"){
                    TableHeadData.push(key);
                }else{
                    if(key === "pk"){
                     removeAtIndex = index;   
                    }
                }
            }
        });
        TableBodyData.push(values);
      
    }
    return(
        <div className="flex flex-col mt-10 mb-4">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="bg-gray-400 px-3 py-3 border-b border-gray-400">
                            <h3 className="font-bold font-body text-gray-700 text-xl">{TableData.name}</h3>
                        </div>
                        <div className="p-4 bg-white">
                           <table className="min-w-full divide-y divide-gray-200 p-4">
                            <TableHead TableHead={TableHeadData} />
                            <TableBody NoOptions={nooptions} TableBody={TableBodyData} removeAtIndex={removeAtIndex} variantID={TableData.pk} />                            
                            </table>  
                        </div>
                       
                 </div>
                </div>
            </div>
        </div>
    )
}

export default Table