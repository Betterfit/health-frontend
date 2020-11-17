import React from 'react';
import Api from "Helpers/api";
const api = new Api();
const UpdateQuantitySupplier = (supplierId,id,data) => {
    console.log(supplierId);
    console.log(id);
    console.log(data);
    api.updateSupplierProductQuantity(supplierId,id,data).then(response=>{
        console.log(response);
    });
}

export default UpdateQuantitySupplier;