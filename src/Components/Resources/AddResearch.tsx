import Button from "Components/Forms/Button";
import React from "react";

const addResearchLink =
    "https://docs.google.com/forms/d/e/1FAIpQLScZOuZqVGEvt6EgSzZWPc2epNWfbW38R8ufdeiazc2dcNDZMg/viewform";
const AddResearch = () => {
    //@ts-ignore
    return (
        <Button
            text="Add Research"
            onClick={() => window.open(addResearchLink)}
        />
    );
};

export default AddResearch;
