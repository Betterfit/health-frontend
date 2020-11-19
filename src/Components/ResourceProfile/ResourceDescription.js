import React, { useState, useEffect } from "react";

const ResourceDescription = ({ label, items }) => {
  return (
    <dl>
        <dt className="uppercase text-betterfit-graphite text-10 tracking-extra-wide leading-7">
        {label}
    </dt>
        {items.map((item, i) =>{
            return(
                <div className="betterfit-grey-blue text-15 leading-7" key={i}>{item}</div>
            )
        })}
    </dl>
  );
};

export default ResourceDescription;
