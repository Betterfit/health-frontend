import React from "react";

const FacilityDescription = ({ label, items }) => {
  return (
    <dl>
      <dt className="uppercase text-betterfit-graphite text-10 tracking-extra-wide ">
        {label}
      </dt>
      {items.map((item, i) => (
        <dd key={i} className="betterfit-grey-blue text-14">
          {item}
        </dd>
      ))}
    </dl>
  );
};

export default FacilityDescription;
