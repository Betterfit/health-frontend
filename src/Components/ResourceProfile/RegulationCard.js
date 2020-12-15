import ResourceDescription from "Components/ResourceProfile/ResourceDescription";
import React from "react";
import { ResourceCard } from "./ResourceCard";
import { Description } from "./ResourceProfileItems";

const RegulationCard = ({ name, tagList, details, color }) => {
  const url = details.url;
  // these are put in arrays as ResourceDescription takes in a list of items
  const location = [details.applicable_location];
  const parties = [details.applicable_parties];

  const link = [
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-resource-blue hover:underline"
    >
      View Regulation
    </a>,
  ];

  return (
    <ResourceCard {...{ name, color, tagList }}>
      <ResourceDescription label="Links" items={link} />
      <ResourceDescription label="Location" items={location} />
      <ResourceDescription label="Pertinent To" items={parties} />
      <Description details={details} />
    </ResourceCard>
  );
};

export default RegulationCard;
