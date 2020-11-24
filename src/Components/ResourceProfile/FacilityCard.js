import TagLink from 'Components/Content/TagLink';
import ResourceDescription from "Components/ResourceProfile/ResourceDescription";
import CardTitle from "Components/ResourceProfile/ResourceTitle";
import { generateAddress, generateShippingAdress } from "Helpers/resourceUtils";
import React from "react";

const FacilityCard = ({name, tagList, details, color}) => {
    const biosafety = [details.biosafety_level];
    const contact = [details.phone_number, details.email];
    const address = generateAddress(details)
    const shipping_address = generateShippingAdress(details)
    const fax = details.fax ? [details.fax] : ['n/a'];
    const website = details.website ? [details.website] : 'n/a';

    return(
        <div role='dialog'>
            <div className="h-1 rounded-md mb-5 -mx-4" style={{background:color}}/>
            <CardTitle label="Health Care Provider" name={name} color={color}></CardTitle>
            <div className="space-y-6">
              <ResourceDescription
                    label="Contact Information"
                    items={contact}
                />
                <ResourceDescription
                    label="Address"
                    items={address}
                />
                <ResourceDescription
                    label="Shipping Address"
                    items={shipping_address}
                />
                <ResourceDescription
                    label="Fax"
                    items={fax}
                />
                <ResourceDescription
                    label="Website"
                    items={website}
                />
                <div className="ml-auto" style={{margin:0}}>
                    {tagList.map(( tag, i ) =>{
                        return(
                            <TagLink tag={tag} key={i} buttonProps={{disabled: true}}/>
                        )
                    })}
                </div>
 
            </div>
        </div>
    )
};

export default FacilityCard;
