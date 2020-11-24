import TagLink from "Components/Content/TagLink";
import ResourceDescription from "Components/ResourceProfile/ResourceDescription";
import CardTitle from "Components/ResourceProfile/ResourceTitle";
import { generateAddress } from "Helpers/resourceUtils";
import React from "react";

const LabCard = ({ name, tagList, details, color }) => {
    const biosafety = [details.biosafety_level];
    const email = [details.email];
    const phone = [details.phone_number];
    const address = generateAddress(details);
    const website = details.website ? [details.website] : "n/a";

    return (
        <div role="dialog">
            <div
                className="h-1 rounded-md mb-5 -mx-4"
                style={{ background: color }}
            />
            <CardTitle label="Lab" name={name} color={color}></CardTitle>
            <div className="space-y-6">
                <ResourceDescription
                    label="Biosafety Level"
                    items={biosafety}
                />
                <ResourceDescription label="Email" items={email} />
                <ResourceDescription label="Phone" items={phone} />
                <ResourceDescription label="Address" items={address} />
                <ResourceDescription label="Website" items={website} />
                {[
                    tagList.map((tag) => {
                        return (
                            <TagLink
                                tag={tag}
                                buttonProps={{ disabled: true }}
                            />
                        );
                    }),
                ]}
            </div>
        </div>
    );
};

export default LabCard;
