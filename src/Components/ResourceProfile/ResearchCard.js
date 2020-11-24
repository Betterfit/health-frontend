import TagLink from 'Components/Content/TagLink';
import ResourceDescription from "Components/ResourceProfile/ResourceDescription";
import CardTitle from "Components/ResourceProfile/ResourceTitle";
import { generateAddress } from "Helpers/resourceUtils";
import React from "react";

const ResearchCard = ({name, tagList, details, color}) => {
    const researcher = [details.main_contact];
    const email = [details.email];
    const phone = [details.phone_number];
    const address = generateAddress(details);
    const description = [details.description];

    return(
        <div role='dialog'>
            <div className="h-1 rounded-md mb-5 -mx-4" style={{background:color}}/>
            <CardTitle label="Research Project" name={name} color={color}></CardTitle>
            <div className="space-y-6">
               <ResourceDescription
                    label="Main Contact"
                    items={researcher}
                />
                <ResourceDescription
                    label="Email"
                    items={email}
                />
                <ResourceDescription
                    label="Phone"
                    items={phone}
                />
                <ResourceDescription
                    label="Address"
                    items={address}
                />
                <ResourceDescription
                    label="Description"
                    items={description}
                />
                <div className="ml-auto" style={{margin:0}}>
                    {tagList.map(tag =>{
                        return(
                            <TagLink tag={tag} buttonProps={{disabled: true}}/>
                        )
                    })}
                </div>
 
            </div>
        </div>
    )
};

export default ResearchCard;
