import ResourceLink from "Components/Resources/ResourceLink";
import React from "react";
import { Resource } from "Types";

interface ResourceDisplayProps {
  resources: Resource[];
}

const resourceColors: { [resourceType: string]: string } = {
  facility: "#56BAC8",
  //lab
  lab: "#61C091",
  //researcher
  research: "#A799F3",
  //supplier
  supplier: "#EA8683",
  //regulation
  regulation: "#7FAAF4",
};

const matchResourceColor = (resourceType: string): string => {
  return resourceColors[resourceType];
};

const ResourceList = ({ resources }: ResourceDisplayProps) => {
  return (
    <div className="flex-grow wrap max-h-screen p-0 h-full rounded-lg overflow-visible md:p-4 md:overflow-scroll ">
      <ul className="flex flex-col md:py-8" aria-label="Resource List">
        {resources.map((resource) => (
          <ResourceLink
            key={"resource" + resource.pk}
            resource={resource}
            color={matchResourceColor(resource.resource_type)}
            extraClasses="resource-container"
          />
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;

interface ResourceProps {
  resource: Resource;
  onClick: () => void;
}
