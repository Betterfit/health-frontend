import React from "react";

const ResourceDescription = ({ label, items }) => {
    // We filter out non-truthy values so that "null" isn't displayed in the application
    const filteredItems = items.filter((item) => item);
    return (
        <dl>
            <dt className="uppercase text-betterfit-graphite text-10 tracking-extra-wide leading-7">
                {label}
            </dt>
            {filteredItems.length > 0
                ? filteredItems.map((item, i) => (
                      <div
                          className="betterfit-grey-blue text-15 leading-7"
                          key={i}
                      >
                          {item}
                      </div>
                  ))
                : "N/A"}
        </dl>
    );
};

export default ResourceDescription;
