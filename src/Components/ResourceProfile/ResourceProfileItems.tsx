/**
 * There's a lot of copy paste happening between the different resource cards.
 * Components will be slowly pulled into here to encourage reuse
 */
import { generateAddress, generateShippingAdress } from "Helpers/resourceUtils";
import React from "react";
import { ResourceDetails } from "Types";
import ResourceDescription from "./ResourceDescription";

interface ProfileItemProps {
    details: ResourceDetails;
}

export const Address = ({ details }: ProfileItemProps) => {
    const address = generateAddress(details);
    if (address.length === 0) return <></>;
    return <GMapsAddressLink address={address} label="address" />;
};

export const ShippingAddress = ({ details }: ProfileItemProps) => {
    const address = generateShippingAdress(details);
    if (address.length === 0) return <></>;
    return <GMapsAddressLink address={address} label="shipping address" />;
};

interface GMapsAddrsLinkProps {
    address: string[];
    label: string;
}

const GMapsAddressLink = ({ address, label }: GMapsAddrsLinkProps) => {
    const addressText = address.join("\n");
    const addressLink = encodeURI(
        // for some reason, including the postal code makes google maps perform worse in terms of location accuracy
        // for this reason, we just include the first two lines of the address - street + city, province
        "https://maps.google.com/?q=" + address.slice(0, 2).join(" ")
    );
    const addressEl = (
        <a
            className="flex flex-col align-start"
            aria-label={label}
            href={addressLink}
            target="_blank"
        >
            {address.map((line, i) => (
                <span key={i}>{line}</span>
            ))}
        </a>
    );

    return (
        <ResourceDescription
            label={label}
            items={addressEl}
            copyText={addressText}
            copyAriaLabel={"copy " + label}
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
            label="Description"
            items={textWithLineBreaks}
            copyText={details.description}
            copyAriaLabel="copy description"
        />
    );
};

export const Phone = ({ details }: ProfileItemProps) => {
    const phone = details.phone_number;
    if (!phone) return <></>;
    return (
        <ResourceDescription
            label="Phone Number"
            items={phone}
            copyText={phone}
            copyAriaLabel="copy phone"
        />
    );
};

export const Email = ({ details }: ProfileItemProps) => {
    const email = details.email;
    if (!email) return <></>;
    const emailLink = <a href={"mailto:" + email}>{email}</a>;
    return (
        <ResourceDescription
            label="Email"
            items={emailLink}
            copyText={email}
            copyAriaLabel="copy email"
        />
    );
};

export const MainContact = ({ details }: ProfileItemProps) => {
    const mainContact = details.main_contact;
    if (!mainContact) return <></>;
    return (
        <ResourceDescription
            label="Main Contact"
            items={mainContact}
            copyText={mainContact}
            copyAriaLabel="copy main contact"
        />
    );
};

export const Fax = ({ details }: ProfileItemProps) => {
    const fax = details.fax;
    if (!fax) return <></>;
    return (
        <ResourceDescription
            label="Fax"
            items={fax}
            copyText={fax}
            copyAriaLabel="copy fax"
        />
    );
};

export const Website = ({ details }: ProfileItemProps) => {
    const website = details.website;
    if (!website) return <></>;
    const websiteLink = (
        <a href={website} target="_blank" arial-label="website link">
            {website}
        </a>
    );
    return (
        <ResourceDescription
            label="Website"
            items={websiteLink}
            copyText={website}
            copyAriaLabel="copy website url"
        />
    );
};
