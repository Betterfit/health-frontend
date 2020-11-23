import TagLink from "Components/Content/TagLink";
import ResourceDescription from "Components/ResourceProfile/ResourceDescription";
import CardTitle from "Components/ResourceProfile/ResourceTitle";
import React from "react";

const RegulationCard = ({ name, tagList, details, color }) => {
    const url = details.url;
    // these are put in arrays as ResourceDescription takes in a list of items
    const location = [details.applicable_location];
    const parties = [details.applicable_parties];
    const description = [details.description];

    const link = [
        <a
            href={url}
            target="_blank"
            className="text-resource-blue hover:underline"
        >
            View Regulation
        </a>,
    ];

    return (
        <div role="dialog">
            <div
                className="h-1 rounded-md mb-5 -mx-4"
                style={{ background: color }}
            />
            <CardTitle
                label="Research Project"
                name={name}
                color={color}
            ></CardTitle>
            <div className="space-y-6">
               <ResourceDescription label="Links" items={link} />
                <ResourceDescription label="Location" items={location} />
                <ResourceDescription label="Pertinent To" items={parties} />
                <ResourceDescription label="Description" items={description} />
                <ResourceDescription label="Tags" items={[]} />
                <div className="ml-auto" style={{ margin: 0 }}>
                    {tagList.map((tag) => 
                        <TagLink tag={tag} buttonProps={{disabled: true}}/>
                    )}
                </div>
 
            </div>
        </div>
    );
};

export default RegulationCard;
