import React, { useState, useEffect } from "react";

const FacilityDescription = ({ label, items }) => {
  return (
    <dl>
      <dt className="uppercase text-betterfit-graphite text-10 tracking-extra-wide ">
        {label}
      </dt>
      {items.map((item) => (
        <dd className="betterfit-grey-blue text-14">{item}</dd>
      ))}
    </dl>
  );
};

export default FacilityDescription;
