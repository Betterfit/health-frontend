import { Transition } from "@tailwindui/react";
import React, { useState, useEffect } from "react";
import useStores from "Helpers/useStores";
import Api from "Helpers/api";

//components
import ResourceDescription from "Components/ResourceProfile/ResourceDescription";
import CardTitle from "Components/ResourceProfile/ResourceTitle";
import TagLink from 'Components/Content/TagLink';

const SupplierCard = ({name, tagList, details, color}) => {
    const api = new Api();
    const contact = [details.phone_number, details.email];
    const address = [details.street, details.city + " " + details.province, details.postal_code];
    const shipping_address = [details.shipping_street, details.shipping_city + " " + details.shipping_province, details.shipping_postal_code];
    const fax = details.fax ? [details.fax] : ['n/a'];
    const website = details.website ? [details.website] : ['n/a'];

    return(
        <div>
            <div className="h-1 rounded-md mb-5 -mx-4" style={{background:color}}/>
            <CardTitle label="Supplier" name={name} color={color}></CardTitle>
            <div className="space-y-6">
                <ResourceDescription
                    label="Tags"
                    items={[]}
                />
                <div className="ml-auto inline-flex" style={{margin:0}}>
                    {tagList.map(tag =>{
                        return(
                            <TagLink tag={tag} />
                        )
                    })}
                </div>
                <ResourceDescription
                    label="Contact Information"
                    items={contact}
                />
                <ResourceDescription
                    label="Address"
                    items={address}
                />
                <ResourceDescription
                    label="Fax"
                    items={fax}
                />
                <ResourceDescription
                    label="Website"
                    items={website}
                />
            </div>
        </div>
    )
};

export default SupplierCard;
