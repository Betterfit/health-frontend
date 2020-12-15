import React from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

const Table = ({ TableData, edit }) => {
    let TableHeadData = [];
    let TableBodyData = [];
    let nooptions = false;
    if (TableData.product_options && TableData.product_options.length) {
        const excludeKeys = ["pk", "product_image"];
        const excludeValues = ["product_image"];
        TableData.product_options.map((variant) => {
            let keys = Object.keys(variant);
            let values = Object.entries(variant);
            keys.forEach((key) => {
                if (!TableHeadData.includes(key)) {
                    TableHeadData.push(key);
                }
            });
            TableBodyData.push(values);
        });
        // exclude keys from filter
        TableHeadData = TableHeadData.filter(
            (item) => !excludeKeys.includes(item)
        );
        TableBodyData = TableBodyData.map((row) => {
            return row.filter((item) => {
                if (!excludeValues.includes(item[0])) {
                    return item;
                }
            });
        });
    } else {
        nooptions = true;
        const excludeKeys = [
            "pk",
            "product_image",
            "product_options",
            "product_variations",
        ];
        const excludeValues = ["product_image"];
        let keys = Object.keys(TableData);
        let values = Object.entries(TableData);
        keys.forEach((key, index) => {
            if (!TableHeadData.includes(key)) {
                TableHeadData.push(key);
            }
        });
        TableBodyData.push(values);

        // exclude keys from filter
        TableHeadData = TableHeadData.filter(
            (item) => !excludeKeys.includes(item)
        );
        TableBodyData = TableBodyData.map((row, index) => {
            return row.filter((item, index) => {
                if (!excludeValues.includes(item[0])) {
                    return item;
                }
            });
        });
    }
    return (
        <div className="flex flex-col mt-4 mb-10">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <div className="bg-paragraph px-3 py-3 border-b border-gray-400">
                            <h3 className="font-bold font-body text-white text-xl">
                                {TableData.name}
                            </h3>
                        </div>
                        <div className="p-4 bg-white">
                            <table className="min-w-full divide-y divide-gray-200 p-4">
                                <TableHead TableHead={TableHeadData} />
                                <TableBody
                                    NoOptions={nooptions}
                                    TableBody={TableBodyData}
                                    variantID={TableData.pk}
                                    edit={edit}
                                />
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;
