import FacilityCard from "Components/ResourceProfile/FacilityCard";
import LabCard from "Components/ResourceProfile/LabCard";
import RegulationCard from "Components/ResourceProfile/RegulationCard";
import ResearchCard from "Components/ResourceProfile/ResearchCard";
import SupplierCard from "Components/ResourceProfile/SupplierCard";
import TagLink from "Components/Resources/TagLink";
import Slider from "Components/Slider/Slider";
import Translator from "Helpers/Translator";
import React, { useState } from "react";
import { Resource, ResourceDetails, Tag } from "Types";

interface ResourceLinkProps {
  resource: Resource;
  color: string;
  extraClasses?: string;
}

interface ResourceCardProps {
  name: string;
  tagList: Tag[];
  details: ResourceDetails;
  color: string;
}

const resourceCardTypes: {
  [resourceType: string]: React.FC<ResourceCardProps>;
} = {
  facility: FacilityCard,
  lab: LabCard,
  research: ResearchCard,
  supplier: SupplierCard,
  regulation: RegulationCard,
};

const ResourceLink = ({
  resource,
  color,
  extraClasses = " ",
}: ResourceLinkProps) => {
  const ResourceCardType = resourceCardTypes[resource.resource_type];
  const resourceCard = ResourceCardType ? (
    //@ts-ignore
    <ResourceCardType
      name={resource.title}
      tagList={resource.tags}
      details={resource.details}
      color={color}
    />
  ) : (
    <div />
  );

  const [showDetails, setShowDetails] = useState(false);
  const toggleSlider = () => {
    setShowDetails(!showDetails);
  };
  return (
    <>
      <li
        className={
          "flex p-1 w-full m-2 rounded-md cursor-pointer py-3 " + extraClasses
        }
        onClick={toggleSlider}
        tabIndex={0}
        aria-label={resource.title}
      >
        <div
          className="w-1 rounded-md mr-2 flex-shrink-0"
          style={{ backgroundColor: color }}
        />
        <div className="p-2 text-left flex-grow">
          <div className="font-semibold text-gray-600 font-body uppercase tracking-extra-wide text-10 opacity-75">
            {Translator(resource.resource_type)}
          </div>
          <div className="font-semibold text-base tracking-wide text-betterfit-graphite">
            {resource.title}
          </div>
        </div>
        <div className="flex flex-row-reverse flex-wrap px-2">
          {resource.tags.map((tag, i) => (
            <TagLink
              tag={tag}
              key={i}
              // these tags are just labels and should not be clickable/focusable
              buttonProps={{
                disabled: true,
              }}
            />
          ))}
        </div>
      </li>
      {showDetails && (
        <Slider active={showDetails} close={toggleSlider}>
          {resourceCard}
        </Slider>
      )}
    </>
  );
};

export default ResourceLink;
