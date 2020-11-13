import React from 'react';
import Api from "Helpers/api";
const api = new Api();
const UpdateQuantitySupplier = (id,data) => {
    // const { store } = useStores();
    // const userData = JSON.parse(store.authStore.userData);
    // const supplierId = userData.user_profile.supplier;
    api.updateSupplierProductQuantity(1,id,data).then(response=>{
    });
}

export default UpdateQuantitySupplier;