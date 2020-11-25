import ResourceDescription from "Components/ResourceProfile/ResourceDescription";
import Translator from "Helpers/Translator";
import React from "react";
import { ResourceCard } from "./ResourceCard";
import { Address, Email, Phone, Website } from "./ResourceProfileItems";

const LabCard = ({ name, tagList, details, color }) => {
    const biosafety = [details.biosafety_level];

    return (
        <ResourceCard type="Lab" {...{ name, color, tagList }}>
            <ResourceDescription
                label={Translator("Biosafety Level")}
                items={biosafety}
            />
            <Email details={details} />
            <Phone details={details} />
            <Address details={details} />
            <Website details={details} />
        </ResourceCard>
    );
};

export default LabCard;
