import React from "react";
import ResourceDescription from "Components/ResourceProfile/ResourceDescription";
import CardTitle from "Components/ResourceProfile/ResourceTitle";
import TagLink from 'Components/Content/TagLink';

const LabCard = ({name, tagList, details, color}) => {
    const showTags = tagList.length ? 'inherit' : 'none';
    const biosafety = [details.biosafety_level];
    const email = [details.email];
    const phone = [details.phone_number];
    const address = [details.street, details.city + " " + details.province, details.postal_code];
    const website = details.website ? [details.website] : 'n/a';

    return(
        <div role='dialog'>
            <div className="h-1 rounded-md mb-5 -mx-4" style={{background:color}}/>
            <CardTitle label="Lab" name={name} color={color}></CardTitle>
            <div className="space-y-6">
               <ResourceDescription
                    label="Biosafety Level"
                    items={biosafety}
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
                    label="Website"
                    items={website}
                />
               <div style={{display:showTags}}>
                    <ResourceDescription
                        label="Tags"
                        items={[]}
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
        </div>
    )
};

export default LabCard;
