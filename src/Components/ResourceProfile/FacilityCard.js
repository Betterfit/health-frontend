import React from "react";
import { ResourceCard } from "./ResourceCard";
import {
  Address,
  Email,
  Fax,
  Phone,
  ShippingAddress,
  Website
} from "./ResourceProfileItems";

const FacilityCard = ({ name, tagList, details, color }) => {
  return (
    <ResourceCard type="Facility" {...{ name, color, tagList }}>
      <Website details={details} />
      <Phone details={details} />
      <Email details={details} />
      <Address details={details} />
      <ShippingAddress details={details} />
      <Fax details={details} />
    </ResourceCard>
  );
};

export default FacilityCard;
