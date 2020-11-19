import ResourceLink from "Components/Content/ResourceLink";
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

const ResourceDisplay = ({ resources }: ResourceDisplayProps) => {
    return (
        <div className="flex-grow wrap max-h-screen p-0 h-full rounded-lg overflow-visible md:p-4 md:overflow-scroll ">
            <div className="flex flex-col md:py-8 ">
                {resources.map((resource) => (
                    <div
                        className="resource-container m-2 rounded-md cursor-pointer"
                        key={"resource" + resource.pk}
                    >
                        <ResourceLink
                            resource={resource}
                            color={matchResourceColor(resource.resource_type)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourceDisplay;

interface ResourceProps {
    resource: Resource;
    onClick: () => void;
}
