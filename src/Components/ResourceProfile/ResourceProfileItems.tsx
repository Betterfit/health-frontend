/**
 * There's a lot of copy paste happening between the different resource cards.
 * Components will be slowly pulled into here to encourage reuse
 */
import { generateAddress, generateShippingAdress } from "Helpers/resourceUtils";
import Translator from "Helpers/Translator";
import React from "react";
import { ResourceDetails } from "Types";
import ResourceDescription from "./ResourceDescription";

interface ProfileItemProps {
    details: ResourceDetails;
}

export const Address = ({ details }: ProfileItemProps) => {
    const address = generateAddress(details);
    if (address.length === 0) return <></>;
    return (
        <ResourceDescription
            label={Translator("Address")}
            items={generateAddress(details)}
        />
    );
};

export const ShippingAddress = ({ details }: ProfileItemProps) => {
    const address = generateShippingAdress(details);
    if (address.length === 0) return <></>;
    return (
        <ResourceDescription
            label={Translator("Shipping Address")}
            items={generateAddress(details)}
        />
    );
};

export const Description = ({ details }: ProfileItemProps) => {
    if (!details.description) return <></>;
    // new lines are ignored so we place line breaks directly into the text
    const textWithLineBreaks = details.description
        .split("\n")
        .flatMap((paragraph) => [paragraph, <br />]);
    return (
        <ResourceDescription
            label={Translator("Description")}
            items={textWithLineBreaks}
        />
    );
};

export const Phone = ({ details }: ProfileItemProps) => {
    const phone = details.phone_number;
    if (!phone) return <></>;
    return <ResourceDescription label={Translator("Phone")} items={[phone]} />;
};

export const Email = ({ details }: ProfileItemProps) => {
    const email = details.email;
    if (!email) return <></>;
    return <ResourceDescription label={Translator("Email")} items={[email]} />;
};

export const MainContact = ({ details }: ProfileItemProps) => {
    const researcher = details.main_contact;
    if (!researcher) return <></>;
    return (
        <ResourceDescription
            label={`${Translator("Main")} ${Translator("Contact")}`}
            items={[researcher]}
        />
    );
};

export const Fax = ({ details }: ProfileItemProps) => {
    const fax = details.fax;
    if (!fax) return <></>;
    return <ResourceDescription label="Fax" items={[fax]} />;
};

export const Website = ({ details }: ProfileItemProps) => {
    const website = details.website;
    if (!website) return <></>;
    return (
        <ResourceDescription label={Translator("Website")} items={[website]} />
    );
};
