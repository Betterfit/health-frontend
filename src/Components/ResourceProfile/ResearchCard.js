import React from "react";
import { ResourceCard } from "./ResourceCard";
import {
  Address,
  Description,
  Email,
  MainContact,
  Phone,
} from "./ResourceProfileItems";

const ResearchCard = ({ name, tagList, details, color }) => {
  return (
    <ResourceCard type="Research" {...{ name, color, tagList }}>
      <MainContact details={details} />
      <Phone details={details} />
      <Email details={details} />
      <Address details={details} />
      <Description details={details} />
    </ResourceCard>
  );
};

export default ResearchCard;
