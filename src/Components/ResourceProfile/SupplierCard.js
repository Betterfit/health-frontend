//components
import React from "react";
import { ResourceCard } from "./ResourceCard";
import {
  Address,
  Email,
  Fax,
  Phone,
  ShippingAddress,
  Website,
} from "./ResourceProfileItems";

const SupplierCard = ({ name, tagList, details, color }) => {
  return (
    <ResourceCard type="Supplier" {...{ name, color, tagList }}>
      <Phone details={details} />
      <Email details={details} />
      <Website details={details} />
      <Address details={details} />
      <ShippingAddress details={details} />
      <Fax details={details} />
    </ResourceCard>
  );
};

export default SupplierCard;
