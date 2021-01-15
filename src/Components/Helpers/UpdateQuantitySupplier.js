import React from "react";
import Api from "Helpers/api";
const api = new Api();
const UpdateQuantitySupplier = (supplierId, id, data) => {
  api
    .updateSupplierProductQuantity(supplierId, id, data)
    .then((response) => {});
};

export default UpdateQuantitySupplier;
