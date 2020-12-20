import React from "react";

const ResourceTitle = ({ label, name, color }) => {
  return (
    <header className="pb-6 flex flex-col items-start justify-between border-b-2 border-grey-700 mb-8">
      <span
        className="uppercase text-xs tracking-extra-wide  font-semibold"
        style={{ color: color }}
      >
        {label}
      </span>
      <h2 className="text-2xl font-medium text-betterfit-graphite">{name}</h2>
    </header>
  );
};

export default ResourceTitle;
