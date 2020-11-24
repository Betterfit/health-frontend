import TagLink from "Components/Content/TagLink";
//components
import ResourceDescription from "Components/ResourceProfile/ResourceDescription";
import CardTitle from "Components/ResourceProfile/ResourceTitle";
import { generateAddress } from "Helpers/resourceUtils";
import React from "react";

const SupplierCard = ({ name, tagList, details, color }) => {
    const contact = [details.phone_number, details.email];
    const address = generateAddress(details);
    const shipping_address = generateAddress(details);
    const fax =  [details.fax]
    const website = [details.website]

    return (
        <div role="dialog">
            <div
                className="h-1 rounded-md mb-5 -mx-4"
                style={{ background: color }}
            />
            <CardTitle label="Supplier" name={name} color={color}></CardTitle>
            <div className="space-y-6">
                <ResourceDescription
                    label="Contact Information"
                    items={contact}
                />
                <ResourceDescription label={"Address"} items={address} />
                <ResourceDescription label="Fax" items={fax} />
                <ResourceDescription label="Website" items={website} />
                <ResourceDescription label="Shipping Address" items={shipping_address}/>
            {tagList.map((tag) => {
                return <TagLink tag={tag} buttonProps={{ disabled: true }} />;
            })}
            </div>
        </div>
    );
};

export default SupplierCard;
