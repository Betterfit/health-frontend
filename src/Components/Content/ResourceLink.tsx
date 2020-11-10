import React, { useState, useEffect } from "react";
import TagLink from "Components/Content/TagLink";
import Slider from "Components/Slider/Slider";
import SupplierCard from "Components/ResourceProfile/SupplierCard";
import ResearchCard from "Components/ResourceProfile/ResearchCard";
import LabCard from "Components/ResourceProfile/LabCard";
import FacilityCard from "Components/ResourceProfile/FacilityCard";
import { Resource, ResourceDetails, Tag } from "Types";

interface ResourceLinkProps {
    resource: Resource;
    color: string;
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
};

const ResourceLink = ({ resource, color }: ResourceLinkProps) => {
    const ResourceCardType = resourceCardTypes[resource.resource_type];
    const resourceCard =
        ResourceCardType !== null ? (
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
        <div className="flex p-1" onClick={toggleSlider}>
            <div
                className="w-1 rounded-md mr-2 flex-shrink-0"
                style={{ backgroundColor: color }}
            />
            <button className="p-2 text-left">
                <div className="font-medium text-gray-700 font-body uppercase tracking-widest text-xs">
                    {resource.resource_type}
                </div>
                <div className="font-semibold text-base tracking-wide">
                    {resource.title}
                </div>
            </button>
            <div className="flex-grow float-right flex px-2 flex-shrink-0">
                <div className="ml-auto inline-flex my-auto">
                    {resource.tags.map((tag) => (
                        <TagLink tag={tag} key={"tag" + tag.pk} />
                    ))}
                </div>
            </div>
            <Slider active={showDetails} close={toggleSlider}>
                {resourceCard}
            </Slider>
        </div>
    );
};

export default ResourceLink;
