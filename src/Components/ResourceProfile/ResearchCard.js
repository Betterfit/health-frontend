import React from "react";
import ResourceDescription from "Components/ResourceProfile/ResourceDescription";
import CardTitle from "Components/ResourceProfile/ResourceTitle";
import TagLink from 'Components/Content/TagLink';

const ResearchCard = ({name, tagList, details, color}) => {
    const researcher = [details.main_contact];
    const email = [details.email];
    const phone = [details.phone_number];
    const address = [details.street, details.city + " " + details.province, details.postal_code];
    const description = [details.description];

    return(
        <div>
            <div className="h-1 rounded-md mb-5 -mx-4" style={{background:color}}/>
            <CardTitle label="Research Project" name={name} color={color}></CardTitle>
            <div className="space-y-6">
                <ResourceDescription
                    label="Tags"
                    items={[]}
                />
                <div className="ml-auto inline-flex" style={{margin:0}}>
                    {tagList.map(p =>{
                        return(
                            <TagLink tagType={p} />
                        )
                    })}
                </div>
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
            </div>
        </div>
    )
};

export default ResearchCard;
